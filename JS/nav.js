function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (!logoutBtn) return;

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('crm_session');
        window.location.href = 'index.html';
    });
}


function changeNavLinkColor() {
    const currentPage = window.location.pathname.split('/').pop();
    console.log(currentPage, typeof currentPage);
    
    document.querySelectorAll('.nav-link').forEach((link) => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage)
            link.classList.add('active');
    });
}


document.addEventListener('DOMContentLoaded', () => {
    setupLogout();
    changeNavLinkColor();
});


