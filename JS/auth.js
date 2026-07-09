
//  =====  SIGN UP  (P1)  =====

function bringElements() {
    const user = {
        fullName:   document.getElementById('fullName'),
        email   :   document.getElementById('email'),
        company :   document.getElementById('company'),
        password:   document.getElementById('password'),
        confPass:   document.getElementById('confirmPassword')
    }

    return user;
}


function resetFields(user) {
    for (let key in user)
        user[key].classList.remove('input-error');

    document.querySelectorAll('.form-group').forEach(group => {
        group.querySelectorAll('small').forEach(small => small.remove());
    });
}

// Error red border and warning text
function showFieldError(input, text) {
    const formGroup = input.closest('.form-group');

    const oldWarning = formGroup.querySelector('small');
    if (oldWarning) oldWarning.remove();

    input.classList.add('input-error');

    const small = document.createElement('small');
    small.textContent = text;
    small.className = 'field-error-message';

    formGroup.appendChild(small);
}


//  =====  SIGN UP Main function  =====
function setUpSignupForm() {
    document.getElementById('signup-form').addEventListener('submit', e => {
        e.preventDefault();
        const user = bringElements();
        resetFields(user);

        const users = JSON.parse(localStorage.getItem('crm_users')) || [];
        let hasError = false;

        // CHECK FULL name
        if (user.fullName.value.trim().length < 3) {
            showFieldError(user.fullName, "Full name must be at least 3 characters");
            hasError = true;
        }
        
        // CHECK Email
        const email = user.email.value.trim().toLowerCase();
        const atIndex = email.indexOf('@');

        if (atIndex === -1 || !email.slice(atIndex + 1).includes('.')) {
            showFieldError(user.email, "Please enter a valid email address");
            hasError = true;
        } else if (users.some(u => u.email === email)) {
            showFieldError(user.email, "An account with this email already exists");
            hasError = true;
        }

        // CHECK password
        let pass = user.password.value;
        let isNum = /[0-9]/.test(pass);
        let isChar = /[a-zA-Z]/.test(pass);
        let isPass = pass.length >= 8;

        if (!isNum || !isChar || !isPass) {
            showFieldError(user.password, "Password must be at least 8 characters and contain a letter and a number");
            hasError = true;
        }

        // CHECK confirm password
        if (pass !== user.confPass.value.trim()) {
            showFieldError(user.confPass, "Passwords do not match");
            hasError = true;
        }


        if (hasError) return;

        const newUser = {
            id: Date.now(),
            fullName: user.fullName.value.trim(),
            email: email,
            password: pass,
            company: user.company.value.trim(),
            createdAt: new Date().toISOString()
        }

        users.push(newUser);
        localStorage.setItem('crm_users', JSON.stringify(users));

        showToast("Account created successfully! Please log in.", "success");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    })
}



// CALL functions
document.addEventListener('DOMContentLoaded', e => {
    setUpSignupForm();
});