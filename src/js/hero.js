document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.text-indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let slideInterval;

    const backgroundImages = [
        '/src/images/hero/dark-blue-color-light-abstract-technology-min.jpg',
        '/src/images/hero/closeup-image-computer-microchip-min.jpg',
        '/src/images/hero/application-programming-interface-software-min.jpg',
        '/src/images/hero/detailed-image-computer-microchip-min.jpg'
    ];

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'block';
                slide.style.opacity = '1';
                slide.style.zIndex = '1';
            } else {
                slide.style.opacity = '0';
                slide.style.zIndex = '0';
                setTimeout(() => {
                    if (i !== currentSlide) {
                        slide.style.display = 'none';
                    }
                }, 100);
            }
        });
        updateIndicators(index);
    }

    function updateIndicators(index) {
        indicators.forEach((indicator, i) => {
            const loadingBar = indicator.querySelector('.loading-bar');
            if (i === index) {
                indicator.classList.add('active');
                animateLoadingBar(loadingBar);
            } else {
                indicator.classList.remove('active');
                resetLoadingBar(loadingBar);
            }
        });
    }

    function animateLoadingBar(loadingBar) {
        resetLoadingBar(loadingBar);
        setTimeout(() => {
            loadingBar.style.transition = 'width 9.7s linear';
            loadingBar.style.width = '100%';
        }, 50);
    }

    function resetLoadingBar(loadingBar) {
        loadingBar.style.transition = 'none';
        loadingBar.style.width = '0';
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        stopAutoSlide();
        slideInterval = setInterval(nextSlide, 10000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (index !== currentSlide) {
                stopAutoSlide();
                currentSlide = index;
                showSlide(currentSlide);
                startAutoSlide();
            }
        });
    });

    // Initialize all slides with single static background
    slides.forEach((slide, index) => {
        const bgElement = slide.querySelector('.bg-cover');
        if (bgElement) {
            bgElement.style.backgroundImage = `url('${backgroundImages[index]}')`;
        }
        if (index === 0) {
            slide.style.display = 'block';
            slide.style.opacity = '1';
            slide.style.zIndex = '1';
        } else {
            slide.style.display = 'none';
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
        }
    });

    showSlide(currentSlide);
    startAutoSlide();
});