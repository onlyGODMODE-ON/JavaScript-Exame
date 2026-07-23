function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (!logoutBtn) return;

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('crm_session');
        window.location.href = 'index.html';
    });
}



document.addEventListener('DOMContentLoaded', () => {
    setupLogout();
});


