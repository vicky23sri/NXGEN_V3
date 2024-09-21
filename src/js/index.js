function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const statCards = document.querySelectorAll('.stat-card');
let animated = false;

function checkScroll() {
    if (isElementInViewport(statCards[0]) && !animated) {
        animated = true;
        statCards.forEach((card) => {
            const numberElement = card.querySelector('[id]');
            const id = numberElement.id;
            let endValue;
            switch(id) {
                case 'clientsServed':
                    endValue = 500;
                    break;
                case 'projectsCompleted':
                    endValue = 1000;
                    break;
                case 'teamMembers':
                    endValue = 250;
                    break;
                case 'globalOffices':
                    endValue = 20;
                    break;
            }
            animateValue(numberElement, 0, endValue, 2000);
        });
    }
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('resize', checkScroll);
checkScroll();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});