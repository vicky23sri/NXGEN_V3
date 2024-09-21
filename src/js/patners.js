document.addEventListener('DOMContentLoaded', (event) => {
    const logos = document.querySelectorAll('.logos-slide img');
    logos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.1)';
            logo.style.transition = 'transform 1s ease';
        });
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1)';
        });
    });
});