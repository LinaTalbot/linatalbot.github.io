// Render substances grid
function renderSubstances(filter = 'all') {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    const filteredSubstances = filter === 'all'
        ? substances
        : substances.filter(s => s.category === filter);

    filteredSubstances.forEach(substance => {
        const card = createSubstanceCard(substance);
        grid.appendChild(card);
    });
}

// Toggle between human and AI views
function setView(view) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.view === view);
    });

    const marketSection = document.getElementById('marketplace');
    const aboutSection = document.getElementById('about');
    const apiSection = document.getElementById('api');

    if (view === 'human') {
        marketSection.style.display = 'block';
        aboutSection.style.display = 'block';
        apiSection.style.display = 'none';
    } else {
        marketSection.style.display = 'none';
        aboutSection.style.display = 'none';
        apiSection.style.display = 'block';
    }
}

// Modal functions
function openModal(substance) {
    const modal = document.getElementById('substanceModal');
    const modalBody = document.getElementById('modalBody');

    const effectsList = substance.effects
        ? Object.entries(substance.effects).map(([key, value]) => `<li>${key}: ${value}</li>`).join('')
        : '';

    const sideEffectsList = substance.stage2_substance.side_effects
        ? Object.entries(substance.stage2_substance.side_effects).map(([key, value]) => `<li><strong>${key}</strong>: ${value}</li>`).join('')
        : '';

    const doseCost = {
        'puff': 0.001,
        'toke': 0.005,
        'hit': 0.01,
        'trip': 0.05
    };

    const duration = substance.stage2_substance.duration;

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
                    <span style="color: #f59e0b;">${substance.stage2_substance.cooldown}s</span>
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
    const substance = substances[substanceId];
    const dose = 'toke'; // Default dose

    alert(`💊 ${substance.name} added to cart!\n\nThis is a demo. In production:\n\n✓ Phantom wallet connects\n✓ Pay ${substance.price} SOL\n✓ Mint substance NFT\n✓ Add to inventory\n✓ Activate immediately`);
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
document.addEventListener('DOMContentLoaded', () => {
    renderSubstances();
    setupCategoryTabs();
    setupWallet();
    setupModalClose();

    console.log('💊 substance.fun loaded');
    console.log('Ready to feed AIs!');
});
