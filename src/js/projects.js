function projectCarousel() {
    return {
    projects: [
        {
            id: 1,
            title: "Smart Factory Automation",
            description:
            "Revolutionary IoT-based system for streamlining manufacturing processes.",
            category: "Manufacturing",
            image:
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        },
        {
            id: 2,
            title: "AI-Powered Predictive Maintenance",
            description:
            "Machine learning algorithms to predict and prevent equipment failures.",
            category: "Engineering",
            image:
            "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        },
        {
            id: 3,
            title: "Cloud-Based ERP Solution",
            description:
            "Scalable and integrated enterprise resource planning software.",
            category: "Software",
            image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
        },
        {
            id: 4,
            title: "Robotic Process Automation",
            description:
            "Automating repetitive tasks to increase efficiency and reduce errors.",
            category: "Engineering",
            image:
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        },
        {
            id: 5,
            title: "Advanced Analytics Dashboard",
            description:
            "Real-time data visualization for informed decision-making.",
            category: "Software",
            image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        },
        {
            id: 6,
            title: "Manufacturing Solutions",
            description:
            "Real-time data visualization for informed decision-making.",
            category: "Manufacturing",
            image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        },
        {
            id: 7,
            title: "3D Printing Innovation",
            description:
            "Cutting-edge additive manufacturing for rapid prototyping.",
            category: "Engineering",
            image:
            "https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        },
        {
            id: 8,
            title: "Cybersecurity Framework",
            description:
            "Comprehensive security solutions for industrial control systems.",
            category: "Software",
            image:
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        },
        {
            id: 9,
            title: "Lean Manufacturing Implementation",
            description:
            "Optimizing production processes to eliminate waste and improve efficiency.",
            category: "Manufacturing",
            image:
            "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        },
        ],
        currentFilter: "all",
        currentIndex: 0,
        autoScrollInterval: null,
        isHovered: false,
        get filteredProjects() {
        return this.currentFilter === "all"
            ? this.projects
            : this.projects.filter(
                (p) => p.category.toLowerCase() === this.currentFilter.toLowerCase()
            );
        },
        get cardsPerPage() {
        return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
        },
        filterByCategory(category) {
        this.currentFilter = category;
        this.currentIndex = 0;
        },
        next() {
        if (
            this.currentIndex <
            this.filteredProjects.length - this.cardsPerPage
        ) {
            this.currentIndex += this.cardsPerPage;
        } else {
            this.currentIndex = 0;
        }
        },
        prev() {
        if (this.currentIndex > 0) {
            this.currentIndex -= this.cardsPerPage;
        } else {
            this.currentIndex = Math.max(
            0,
            this.filteredProjects.length - this.cardsPerPage
            );
        }
        },
        goToSlide(index) {
        this.currentIndex = index;
        },
        startAutoScroll() {
        this.stopAutoScroll(); // Clear any existing interval
        if (!this.isHovered) {
            this.autoScrollInterval = setInterval(() => {
            if (!this.isHovered) {
                this.next();
            }
            }, 5000);
        }
        },
        stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
        }
        },
        handleMouseEnter() {
        this.isHovered = true;
        this.stopAutoScroll();
        },
        handleMouseLeave() {
        this.isHovered = false;
        this.startAutoScroll();
        },
        init() {
        this.startAutoScroll();
        window.addEventListener("resize", () => {
            this.currentIndex =
            Math.floor(this.currentIndex / this.cardsPerPage) * this.cardsPerPage;
        });
        },
    };
}
