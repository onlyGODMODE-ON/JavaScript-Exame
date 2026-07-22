
// profile name, company and email
function currentUserInfo() {
    const session = JSON.parse(localStorage.getItem('crm_session'));
    const users = JSON.parse(localStorage.getItem('crm_users')) || [];
    if (!users || !session) return;

    let user = users.find(u => u.id === session.userId);
    return user;
}

// user info in title area 
function addProfileInfo() {
    let currentUser = currentUserInfo();
    let profileCont = document.getElementById('profile-initials');
    profileCont.textContent = currentUser.fullName.split(' ').map(name => name[0]).join('').toUpperCase();

    document.getElementById('profile-name').textContent = currentUser.fullName;
    document.getElementById('profile-email').textContent = currentUser.email;
    document.getElementById('profile-company').textContent = currentUser.company ? currentUser.company : '-';
    document.getElementById('profile-since').textContent = new Date(currentUser.createdAt).toLocaleDateString("en-US");
}


// check if profail is edited
function changeName() {
    let editProfileForm = document.getElementById('edit-profile-form');
    if (!editProfileForm) return;

    editProfileForm.addEventListener('submit', e => {
        e.preventDefault();

        let user = {
            editName: editProfileForm.querySelector('#edit-fullName'),
            editCompany: editProfileForm.querySelector('#edit-company')
        }

        resetFieldErrors(user);

        if (user.editName.value.trim().length < 3) {
            showFieldError(user.editName, "Full name must be at least 3 characters");
            return;
        }

        const session = JSON.parse(localStorage.getItem('crm_session'));
        const users = JSON.parse(localStorage.getItem('crm_users')) || [];
        if (!users || !session) return;

        let userNow = users.find(u => u.id === session.userId);

        userNow.fullName = user.editName.value.trim();
        userNow.company = user.editCompany.value.trim();
        
        localStorage.setItem('crm_users', JSON.stringify(users));
        showToast("Profile updated ✓", "success");

        addProfileInfo();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    addProfileInfo();
    changeName();
});