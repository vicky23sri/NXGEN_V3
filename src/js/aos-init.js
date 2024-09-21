document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });

    window.addEventListener('scroll', function() {
        AOS.refresh();
    });
});