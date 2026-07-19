
// which client is open in modal
let currentDetailClientId = null;


// bring 'crm_clients' clients or return empty array
const loadClientsSimple = () => JSON.parse(localStorage.getItem('crm_clients')) || [];

const formatCurrency = amount => '$' + amount.toLocaleString('en-US');

// Render Clients P4.3
function buildClientCard(client) {
    const card = document.createElement('div');
    card.className = 'client-card';
    card.setAttribute('data-id', client.id);

    card.innerHTML = `
        <img class="avatar" src="${client.image}" alt="${client.name}" />
        <div class="client-info">
            <h3>${client.name}</h3>
            <p class="client-company">${client.company}</p>
            <p class="client-email">${client.email}</p>
        </div>
        <div class="client-meta">
            <select class="status-select" data-id="${client.id}">
                <option value="Lead" ${client.status === "Lead" ? "selected" : ""}>Lead</option>
                <option value="Contacted" ${client.status === "Contacted" ? "selected" : ""}>Contacted</option>
                <option value="Won" ${client.status === "Won" ? "selected" : ""}>Won</option>
                <option value="Lost" ${client.status === "Lost" ? "selected" : ""}>Lost</option>
            </select>
            <span class="deal-value">${formatCurrency(client.dealValue)}</span>
            <button class="btn btn-danger btn-small delete-btn" data-id="${client.id}">Delete</button>
        </div>
    `;

    return card;
}

function renderClients(clients) {
    const container = document.getElementById('clients-list');
    if (!container) return;
    
    container.innerHTML = "";

    if (clients.length === 0) {
        container.innerHTML = `<p class="empty-state">No clients found.</p>`;
        return;
    }

    clients.forEach(c => container.appendChild(buildClientCard(c)));
}


// ====================
// client modal (panel)
// ====================

// add notes function
function renderNotes(notes) {
    const notesList = document.getElementById('notes-list');
    if (!notesList) return;

    if (!notes || notes.length === 0) {
        notesList.innerHTML = `<p class="empty-state">No notes yet.</p>`;
        notesList.classList.add('notes-list-empty');
        return;
    }

    notesList.classList.remove('notes-list-empty');
    notesList.innerHTML = notes.map(note => `
        <div class="note-row">
            <p>${note.text}</p>
            <span>${note.date}</span>
        </div>
    `).join('');
}

function addNoteForm(clients) {
    const noteForm = document.getElementById('add-note-form');
    if (!noteForm) return;

    noteForm.addEventListener('submit', e => {
        e.preventDefault();

        const noteInput = document.getElementById('note-text-input');
        const text = noteInput.value.trim();
        if (text === '') return;

        const client = clients.find(c => c.id === currentDetailClientId);
        if (!client) return;
        
        client.notes.push({ text, date: new Date().toLocaleString() });
        localStorage.setItem('crm_clients', JSON.stringify(clients));

        renderNotes(client.notes);
        noteForm.reset();
    });
}



function setupClientModal(clients) {
    const container = document.querySelector('.clients-list');
    const modal = document.querySelector('#client-detail-modal');

    if (!container) return;
    
    // open modal
    container.addEventListener('click', e => {
        if (e.target.closest('.status-select') || e.target.closest('.delete-btn')) return;
        
        const clickedCard = e.target.closest('.client-card');
        if (!clickedCard) return;

        modal.classList.add('open');

        const clientId = Number(clickedCard.getAttribute('data-id'));
        currentDetailClientId = clientId;
        const client = clients.find(c => c.id === clientId);
        

        modal.querySelector('#detail-avatar').src = client.image;
        modal.querySelector('#detail-name').textContent = client.name;
        modal.querySelector('#detail-company').textContent = client.company;
        modal.querySelector('#detail-email').textContent = client.email;
        modal.querySelector('#detail-phone').textContent = client.phone;
        modal.querySelector('#detail-status').textContent = client.status;
        modal.querySelector('#detail-deal-value').textContent = client.dealValue;
        modal.querySelector('#detail-since').textContent = new Date(client.createdAt).toLocaleDateString("en-US");

        renderNotes(client.notes);
    });

    // remain in 1 minute
    const remindBtn = document.getElementById('remind-btn');
    remindBtn.addEventListener('click', () => {
        const client = clients.find(c => c.id === currentDetailClientId);
        if (!client) return;

        showToast("Reminder set ✓", "success");

        setTimeout(() => {
            showToast(`⏰ Follow up: ${client.name}`, "success");
        }, 60000);
    });

    // close modal
    const closeModal = modal.querySelector('.modal-close');
    modal.addEventListener('click', e => {
        if (e.target === closeModal || !e.target.closest('.modal-box'))
        modal.classList.remove('open');
    });
}


// ====================
// add status changeing
// ====================

function changeStatus(clients) {
    const container = document.querySelector('.clients-list');
    if (!container) return;

    container.addEventListener('click', e => {
        let currentCard = e.target.closest('.status-select');
        if (!currentCard) return;

        const clientId = Number(currentCard.getAttribute('data-id'));
        const client = clients.find(c => c.id === clientId);

        client.status = currentCard.value;
        
        localStorage.setItem('crm_clients', JSON.stringify(clients));
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const clients = loadClientsSimple();

    renderClients(clients);
    setupClientModal(clients);
    addNoteForm(clients);
    changeStatus(clients);
});

