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

function createSubstanceCard(substance) {
    const card = document.createElement('div');
    card.className = `card ${substance.rarity >= 5 ? 'legendary' : ''}`;
    card.onclick = () => openModal(substance);

    const rarityDots = Array(5).fill(0).map((_, i) =>
        `<span class="rarity-dot ${i < substance.rarity ? 'filled' : ''}"></span>`
    ).join('');

    card.innerHTML = `
        <div class="card-header">
            <div>
                <div class="card-name">${substance.emoji} ${substance.name}</div>
            </div>
            <span class="card-category">${substance.category}</span>
        </div>
        <div class="card-effect">${substance.effect}</div>
        <div class="card-side"><strong>Side:</strong> ${substance.sideEffect}</div>
        <div class="card-footer">
            <div class="card-price">${substance.price} <span>SOL</span></div>
            <div class="card-rarity">${rarityDots}</div>
        </div>
    `;

    return card;
}

// Modal functions
function openModal(substance) {
    const modal = document.getElementById('substanceModal');
    const modalBody = document.getElementById('modalBody');

    const effectsList = substance.effects.map(e => `<li>${e}</li>`).join('');
    const sideEffectsList = substance.sideEffects.map(e => `<li>${e}</li>`).join('');

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

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div>
                <span style="color: #a0a0a0;">Price:</span>
                <span style="color: #10b981; font-size: 1.5rem; font-weight: 800; margin-left: 10px;">${substance.price} SOL</span>
            </div>
            <div style="color: #a0a0a0; font-size: 0.85rem;">
                Duration: ${Math.floor(substance.price * 20) + 5} turns • Cooldown: ${Math.floor(substance.price * 60) + 30}s
            </div>
        </div>

        <button class="modal-buy-btn" onclick="purchaseSubstance('${substance.id}')">Purchase with SOL</button>
    `;

    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('substanceModal');
    modal.classList.remove('active');
}

function purchaseSubstance(substanceId) {
    alert(`💊 Purchase initiated for: ${substanceId}\n\nThis is a demo site. In production, this would:\n1. Connect to Phantom wallet\n2. Request ${substances.find(s => s.id === substanceId).price} SOL\n3. Mint substance NFT\n4. Add to your inventory\n5. Activate immediately`);
}

// Category tabs
function setupCategoryTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.onclick = () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderSubstances(tab.dataset.category);
        };
    });
}

// Wallet connection (demo)
function setupWallet() {
    const walletBtn = document.getElementById('walletBtn');
    let connected = false;

    walletBtn.onclick = async () => {
        if (!connected) {
            walletBtn.textContent = 'Connecting...';
            await new Promise(r => setTimeout(r, 1000));
            walletBtn.textContent = 'Gx...7n2P';
            walletBtn.classList.add('connected');
            connected = true;
        } else {
            walletBtn.textContent = 'Connect Wallet';
            walletBtn.classList.remove('connected');
            connected = false;
        }
    };
}

// Modal close handlers
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

    // Animate stats on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.stat, .step').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// Add CSS animation via JS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
