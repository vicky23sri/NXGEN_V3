function carouselData() {
    return {
        currentIndex: 0,
        visibleCards: 3,
        autoScrollInterval: null,
        isHovered: false,
        services: [
            {
                title: "Software Services",
                shortDesc: "Innovate. Create. Elevate.",
                description: "Expert software solutions that ensure scalability and drive your business forward.",
                image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                features: [
                    "Custom software solutions",
                    "Web and mobile app development",
                    "Cloud-based applications",
                    "API integration services"
                ]
            },
            {
                title: "Engineering Services",
                shortDesc: "Design. Build. Optimize.",
                description: "Expert engineering that drives innovation from concept to production",
                image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                features: [
                    "Product design and prototyping",
                    "3D modeling and simulation",
                    "Structural analysis",
                    "Automation solutions"
                ]
            },
            {
                title: "Manufacturing Services",
                shortDesc: "Produce. Refine. Deliver.",
                description: "We bring your ideas to life with cutting-edge manufacturing techniques and quality control processes.",
                image: "https://img.freepik.com/free-photo/flat-lay-circuit-board-close-up_23-2149174363.jpg?ga=GA1.1.415415411.1725936376&semt=ais_hybrid",
                features: [
                    "Precision manufacturing",
                    "Assembly and packaging",
                    "Quality control",
                    "Supply chain management"
                ]
            },
            {
                title: "Training Solutions",
                shortDesc: "Learn. Grow. Excel.",
                description: "Empower your team with our comprehensive training programs, tailored to your industry needs.",
                image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                features: [
                    "Technical skills development",
                    "Leadership training",
                    "Customized workshops",
                    "E-learning platforms"
                ]
            },
            {
                title: "Staffing Solutions",
                shortDesc: "Connect. Empower. Achieve.",
                description: "Find the right talent to drive your business forward with our expert staffing services.",
                image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                features: [
                    "IT and engineering recruitment",
                    "Contract-to-hire options",
                    "Executive search",
                    "Skill assessment and matching"
                ]
            }
        ],
        init() {
            this.updateVisibleCards();
            window.addEventListener('resize', this.updateVisibleCards.bind(this));
            this.startAutoScroll();
        },
        startAutoScroll() {
            if (!this.isHovered) {
                this.autoScrollInterval = setInterval(() => {
                    this.next();
                }, 5000);
            }
        },
        stopAutoScroll() {
            clearInterval(this.autoScrollInterval);
        },
        pauseAutoScroll() {
            this.isHovered = true;
            this.stopAutoScroll();
        },
        resumeAutoScroll() {
            this.isHovered = false;
            this.startAutoScroll();
        },
        next() {
            this.currentIndex = (this.currentIndex + 1) % (this.services.length - this.visibleCards + 1);
            this.resetAutoScroll();
        },
        prev() {
            this.currentIndex = (this.currentIndex - 1 + (this.services.length - this.visibleCards + 1)) % (this.services.length - this.visibleCards + 1);
            this.resetAutoScroll();
        },
        resetAutoScroll() {
            this.stopAutoScroll();
            this.startAutoScroll();
        },
        updateVisibleCards() {
            if (window.innerWidth < 640) {
                this.visibleCards = 1;
            } else if (window.innerWidth < 1024) {
                this.visibleCards = 2;
            } else {
                this.visibleCards = 3;
            }
        }
    };
}