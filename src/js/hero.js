document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.text-indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let slideInterval;
    let bgInterval;

    const backgroundImages = [
        [
            '/src/images/hero-section/tech/tech1.jpg',
            '/src/images/hero-section/tech/tech2.jpg',
            '/src/images/hero-section/tech/tech3.jpg'
        ],
        [
            '/src/images/hero-section/engineering/engi1.jpg',
            '/src/images/hero-section/engineering/engi2.jpg',
            '/src/images/hero-section/engineering/engi3.jpg'
        ],
        [
            '/src/images/hero-section/software/soft1.jpg',
            '/src/images/hero-section/software/soft2.jpg',
            '/src/images/hero-section/software/soft3.jpg'
        ],
        [
            '/src/images/hero-section/manufacturing/man1.jpg',
            '/src/images/hero-section/manufacturing/man2.jpg',
            '/src/images/hero-section/manufacturing/man3.jpg'
        ]
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
        startBackgroundCycle(index);
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

    function startBackgroundCycle(slideIndex) {
        let bgIndex = 0;
        const bgImages = backgroundImages[slideIndex];
        let currentBg = slides[slideIndex].querySelector('.bg-cover');
        let nextBg = slides[slideIndex].querySelector('.bg-cover:nth-child(2)') || document.createElement('div');
        let thirdBg = slides[slideIndex].querySelector('.bg-cover:nth-child(3)') || document.createElement('div');
        
        if (!slides[slideIndex].querySelector('.bg-cover:nth-child(2)')) {
            nextBg.className = 'bg-cover bg-center w-full h-full absolute top-0 left-0 transition-opacity duration-1000 opacity-0';
            slides[slideIndex].insertBefore(nextBg, currentBg);
        }

        if (!slides[slideIndex].querySelector('.bg-cover:nth-child(3)')) {
            thirdBg.className = 'bg-cover bg-center w-full h-full absolute top-0 left-0 transition-opacity duration-1000 opacity-0';
            slides[slideIndex].insertBefore(thirdBg, nextBg);
        }

        clearInterval(bgInterval);

        function cycleBackground() {
            const nextIndex = (bgIndex + 1) % bgImages.length;
            const upcomingIndex = (bgIndex + 2) % bgImages.length;

            // Preload the upcoming image
            thirdBg.style.backgroundImage = `url('${bgImages[upcomingIndex]}')`;

            // Fade in the next image
            nextBg.style.backgroundImage = `url('${bgImages[nextIndex]}')`;
            nextBg.style.opacity = '1';
            currentBg.style.opacity = '0';
            
            // After transition, update current and prepare next
            setTimeout(() => {
                currentBg.style.backgroundImage = nextBg.style.backgroundImage;
                currentBg.style.opacity = '1';
                nextBg.style.opacity = '0';

                // Swap references
                [currentBg, nextBg, thirdBg] = [nextBg, thirdBg, currentBg];
            }, 1000);

            bgIndex = nextIndex;
        }

        currentBg.style.backgroundImage = `url('${bgImages[0]}')`;
        nextBg.style.backgroundImage = `url('${bgImages[1]}')`;
        bgInterval = setInterval(cycleBackground, 3000);
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

    // Initialize all slides
    slides.forEach((slide, index) => {
        let currentBg = slide.querySelector('.bg-cover');
        if (currentBg) {
            currentBg.style.backgroundImage = `url('${backgroundImages[index][0]}')`;
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