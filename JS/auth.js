
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


function setupSignupForm() {
    const form = document.getElementById('signup-form');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const user = bringElements();
        resetFields(user);

        let hasError = false;

        // CHECK FULL name
        if (user.fullName.value.trim().length >= 3) {
            console.log("yes");
        } else {
            showFieldError(user.fullName, "Full name must be at least 3 characters");
            hasError = true;
        }
        
        // CHECK Email
        const email = user.email.value.trim().toLowerCase();
        const atIndex = email.indexOf('@');
        if (atIndex > 0 && email.slice(atIndex + 1).includes('.')) {
            console.log("YES");
        } else {
            showFieldError(user.email, "Please enter a valid email address");
            hasError = true;
        }

        // CHECK Company
        if (user.company.value.trim() !== ""){
            console.log("Yes");
        }


        // CHECK password
        let pass = user.password.value.trim();
        let isNum = /[0-9]/.test(pass);
        let isChar = /[a-zA-Z]/.test(pass);
        let isPass = pass.length >= 8;

        if (isNum && isChar && isPass) {
            console.log("YES");
        } else {
            showFieldError(user.password, "Password must be at least 8 characters and contain a letter and a number");
            hasError = true;
        }

        // CHECK confirm password
        if (pass === user.confPass.value.trim()) {
            console.log("YES");
        } else {
            showFieldError(user.confPass, "Passwords do not match");
            hasError = true;
        }
    })
}



// CALL functions
document.addEventListener('DOMContentLoaded', e => {
    setupSignupForm();
});