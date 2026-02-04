const API_BASE = 'https://subfun-backend-lt-2026.fly.dev/api/v1';
let activeSubstances = Array.isArray(window.substances) ? window.substances : [];

// LLM note: the card renderer was missing, which broke JS execution and
// prevented the human/AI switcher from working on the live site.
function createSubstanceCard(substance) {
    const card = document.createElement('div');
    card.className = `card ${substance.rarity >= 5 ? 'legendary' : ''}`;

    const effectText = substance.effect
        || (Array.isArray(substance.effects) ? substance.effects[0] : '')
        || '';
    const sideEffectText = substance.sideEffect
        || (Array.isArray(substance.sideEffects) ? substance.sideEffects[0] : '')
        || substance.stage2_substance?.side_effects?.note
        || '';

    card.innerHTML = `
        <div class="card-header">
            <div>
                <div class="card-name">${substance.emoji ?? '💊'} ${substance.name}</div>
                <div class="card-category">${substance.category}</div>
            </div>
            <div class="card-rarity">
                ${Array.from({ length: 5 }).map((_, index) => `
                    <div class="rarity-dot ${index < substance.rarity ? 'filled' : ''}"></div>
                `).join('')}
            </div>
        </div>
        <div class="card-effect">${effectText}</div>
        <div class="card-side"><strong>Side effect:</strong> ${sideEffectText}</div>
        <div class="card-footer">
            <div class="card-price">${substance.price}<span> SOL</span></div>
        </div>
    `;

    card.addEventListener('click', () => openModal(substance));
    return card;
}

// Render substances grid
function renderSubstances(filter = 'all') {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    const filteredSubstances = filter === 'all'
        ? activeSubstances
        : activeSubstances.filter(s => s.category === filter);

    filteredSubstances.forEach(substance => {
        const card = createSubstanceCard(substance);
        grid.appendChild(card);
    });
}

// Toggle between human and AI views.
// LLM note: this was expanded to power the big hero "I'm a Human / I'm an AI" switch,
// hiding or revealing entire site sections so each audience gets a focused experience.
function setView(view) {
    document.querySelectorAll('.nav-tab, .view-toggle').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.view === view);
        if (tab.classList.contains('view-toggle')) {
            tab.setAttribute('aria-pressed', tab.dataset.view === view ? 'true' : 'false');
        }
    });

    document.querySelectorAll('.human-only').forEach(element => {
        element.hidden = view !== 'human';
    });

    document.querySelectorAll('.ai-only').forEach(element => {
        element.hidden = view !== 'ai';
    });
}

function normalizeEffects(substance) {
    if (Array.isArray(substance.effects)) {
        return substance.effects.map(item => `<li>${item}</li>`).join('');
    }
    if (substance.stage2_substance?.side_effects && typeof substance.effects === 'object') {
        return Object.entries(substance.effects).map(([key, value]) => `<li>${key}: ${value}</li>`).join('');
    }
    return '';
}

function normalizeSideEffects(substance) {
    if (Array.isArray(substance.sideEffects)) {
        return substance.sideEffects.map(item => `<li>${item}</li>`).join('');
    }
    if (substance.stage2_substance?.side_effects) {
        return Object.entries(substance.stage2_substance.side_effects)
            .map(([key, value]) => `<li><strong>${key}</strong>: ${value}</li>`)
            .join('');
    }
    return '';
}

async function loadSubstances() {
    try {
        const response = await fetch(`${API_BASE}/substances`);
        if (!response.ok) throw new Error('Failed to load substances');
        const payload = await response.json();
        if (payload?.success && Array.isArray(payload.data)) {
            activeSubstances = payload.data;
            return;
        }
    } catch (error) {
        // Fallback to local demo data.
        activeSubstances = Array.isArray(window.substances) ? window.substances : [];
    }
}

// Modal functions
function openModal(substance) {
    const modal = document.getElementById('substanceModal');
    const modalBody = document.getElementById('modalBody');

    const effectsList = normalizeEffects(substance);
    const sideEffectsList = normalizeSideEffects(substance);

    const doseCost = {
        'puff': 0.001,
        'toke': 0.005,
        'hit': 0.01,
        'trip': 0.05
    };

    const duration = substance.stage2_substance?.duration ?? Math.floor(substance.price * 20) + 5;
    const cooldown = substance.stage2_substance?.cooldown ?? Math.floor(substance.price * 60) + 30;

    modalBody.innerHTML = `
        <div class="modal-title">${substance.emoji} ${substance.name}</div>
        <div class="modal-category">${substance.category} • Rarity: ${'★'.repeat(substance.rarity)}${'☆'.repeat(5 - substance.rarity)}</div>
        <p class="modal-description">${substance.description}</p>

        <div class="modal-effects">
            <h4>✨ Effects</h4>
            <ul>${effectsList}</ul>
        </div>

        <div class="modal-side-effects">
            <h4>⚠️ Side Effects</h4>
            <ul>${sideEffectsList}</ul>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin: 30px 0;">
            <div>
                <span style="color: #10b981; font-size: 1.5rem; font-weight: 800;">${substance.price} <span style="font-size: 1rem; color: #a0a0a0;">SOL</span></span>
            </div>
            <div style="text-align: right;">
                <div style="margin-bottom: 10px;">
                    <span style="color: #a0a0a0;">Duration:</span>
                    <span style="color: #f0f0f0;">${duration} turns</span>
                </div>
                <div style="margin-bottom: 10px;">
                    <span style="color: #a0a0a0;">Cooldown:</span>
                    <span style="color: #f59e0b;">${cooldown}s</span>
                </div>
            </div>
        </div>

        <button class="modal-buy-btn" onclick="purchaseSubstance('${substance.id}')">
            Purchase with SOL
        </button>
    `;

    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('substanceModal');
    modal.classList.remove('active');
}

function purchaseSubstance(substanceId) {
    const substance = activeSubstances.find(item => item.id === substanceId);
    if (!substance) return;

    fetch(`${API_BASE}/purchase/${substanceId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            walletAddress: 'demo-wallet',
            signature: 'demo-signature',
            persistent: false
        })
    })
        .then(() => {
            alert(`💊 ${substance.name} added to cart!\n\nThis is a demo. In production:\n\n✓ Phantom wallet connects\n✓ Pay ${substance.price} SOL\n✓ Mint substance NFT\n✓ Add to inventory\n✓ Activate immediately`);
        })
        .catch(() => {
            alert(`💊 ${substance.name} added to cart!\n\n(Backend unavailable, showing local demo flow.)`);
        });
}

// Category tabs
function setupCategoryTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderSubstances(category);
        });
    });
}

// Wallet connect (demo)
function setupWallet() {
    const walletBtn = document.getElementById('walletBtn');
    let connected = false;

    walletBtn.onclick = () => {
        if (!connected) {
            walletBtn.textContent = 'Connecting...';
            setTimeout(() => {
                walletBtn.textContent = 'Gx...7n2P';
                walletBtn.classList.add('connected');
                connected = true;
            }, 1000);
        } else {
            walletBtn.textContent = 'Connect Wallet';
            walletBtn.classList.remove('connected');
            connected = false;
        }
    };
}

// Modal close
function setupModalClose() {
    const modal = document.getElementById('substanceModal');
    const closeBtn = modal.querySelector('.close');

    closeBtn.onclick = closeModal;

    modal.onclick = (e) => {
        if (e.target === modal) {
            closeModal();
        }
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadSubstances();
    renderSubstances();
    setupCategoryTabs();
    setupWallet();
    setupModalClose();
    document.querySelectorAll('.nav-tab, .view-toggle').forEach(button => {
        button.addEventListener('click', () => setView(button.dataset.view));
    });
    const switcher = document.querySelector('.perspective-switch');
    if (switcher) {
        switcher.addEventListener('click', (event) => {
            const button = event.target.closest('.view-toggle');
            if (!button) return;
            setView(button.dataset.view);
        });
    }
    setView('human');

    console.log('💊 substance.fun loaded');
    console.log('Ready to feed AIs!');
});
