
// profile name, company and email
function userInfo() {
    const session = JSON.parse(localStorage.getItem('crm_session'));
    const users = JSON.parse(localStorage.getItem('crm_users')) || [];
    if (!users || !session) return;

    let currentUser = users.find(u => u.id === session.userId);
    return currentUser;
}

function addProfileInfo() {
    let currentUser = userInfo();
    let profileCont = document.getElementById('profile-initials');
    profileCont.textContent = currentUser.fullName.split(' ').map(name => name[0]).join('');

    let profileName    = document.getElementById('profile-name');
    let profileEmail   = document.getElementById('profile-email');
    let profileCompany = document.getElementById('profile-company');
    let profileDate    = document.getElementById('profile-since');

    profileName.textContent    = currentUser.fullName;
    profileEmail.textContent   = currentUser.email;
    profileCompany.textContent = currentUser.company;
    profileDate.textContent    = new Date(currentUser.createdAt).toLocaleDateString("en-US");
}



document.addEventListener('DOMContentLoaded', () => {
    addProfileInfo();
    
});