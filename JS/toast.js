function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`; // toast-success ან toast-error
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}