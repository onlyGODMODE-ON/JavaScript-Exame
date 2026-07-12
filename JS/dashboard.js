// P3.1 - greeting with the user's first name
function showGreeting() {
    const user = getCurrentUser();
    const greetingEl = document.getElementById('greeting');
    // This is important cause it's check's is or not page loaded
    if (!user || !greetingEl) return;
    const firstName = user.fullName.split(' ')[0];
    greetingEl.textContent = `Welcome back, ${firstName}!`;
}

// P3.1 - clock that updates every second
function startLiveClock() {
    const clockEl = document.getElementById('live-clock');
    const dateEl = document.getElementById('live-date');
    // This is important cause it's check's is or not page loaded
    if (!clockEl || !dateEl) return;

    function tick() {
        clockEl.textContent = new Date().toLocaleTimeString();
        dateEl.textContent = new Date().toLocaleDateString();
    }

    tick(); // run once immediately so we don't wait 1 full second for the first paint
    setInterval(tick, 1000);
}


document.addEventListener('DOMContentLoaded', () => {
    showGreeting();
    startLiveClock();
});