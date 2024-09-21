document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.text-indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderIndicators = document.getElementById('sliderIndicators');
    let currentSlide = 0;
    let interval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
            slide.style.zIndex = i === index ? '1' : '0';
        });
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
                indicator.querySelector('.loading-bar').style.width = '0';
                setTimeout(() => {
                    indicator.querySelector('.loading-bar').style.width = '100%';
                }, 50);
            } else {
                indicator.classList.remove('active');
                indicator.querySelector('.loading-bar').style.width = '0';
            }
        });
    }

    function resetProgressBar() {
        indicators.forEach(indicator => {
            indicator.querySelector('.loading-bar').style.width = '0';
        });
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
        interval = setInterval(nextSlide, 8000);
    }

    function stopAutoSlide() {
        clearInterval(interval);
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
            stopAutoSlide();
            currentSlide = index;
            showSlide(currentSlide);
            startAutoSlide();
        });
    });

    showSlide(currentSlide);
    startAutoSlide();
});