// bring 'crm_clients' clients or return empty array
function loadClientsSimple() {
    return JSON.parse(localStorage.getItem('crm_clients')) || [];
}






document.addEventListener('DOMContentLoaded', () => {
    const clients = loadClientsSimple();

    
});