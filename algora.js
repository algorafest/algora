// DOM Elements
const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const navBar = document.querySelector('.nav-bar');
const sideMenu = document.querySelector('.side-menu');
const menuTriggerArea = document.querySelector('.menu-trigger-area');
const menuClose = document.querySelector('.menu-close');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const searchTrigger = document.querySelector('.search-trigger');
const searchContainer = document.querySelector('.search-container');
const searchClose = document.querySelector('.search-close');
const searchInput = document.querySelector('.search-input');
const searchResults = document.querySelector('.search-results');
const eventCards = document.querySelectorAll('.event-card');
const contactInfo = document.querySelector('.contact-info');
const contactForm = document.querySelector('.contact-form');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    themeToggle.innerHTML = newTheme === 'dark' 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
});

// Navigation Bar Hide/Show on Scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navBar.classList.add('hidden');
    } else {
        // Scrolling up
        navBar.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    
    // Check for scroll and show elements when they come into view
    animateOnScroll();
});

// Side Menu
menuTriggerArea.addEventListener('mouseenter', () => {
    sideMenu.classList.add('open');
});

menuClose.addEventListener('click', () => {
    sideMenu.classList.remove('open');
});

document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && !menuTriggerArea.contains(e.target)) {
        sideMenu.classList.remove('open');
    }
});

// Cursor Effects
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Add a slight delay for follower for smoother effect
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

document.addEventListener('mousedown', () => {
    cursor.style.width = '15px';
    cursor.style.height = '15px';
    cursorFollower.style.width = '30px';
    cursorFollower.style.height = '30px';
});

document.addEventListener('mouseup', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursorFollower.style.width = '40px';
    cursorFollower.style.height = '40px';
});

// Hide cursor when idle
let cursorTimeout;
document.addEventListener('mousemove', () => {
    cursor.classList.remove('hide-cursor');
    cursorFollower.classList.remove('hide-cursor');
    
    clearTimeout(cursorTimeout);
    
    cursorTimeout = setTimeout(() => {
        cursor.classList.add('hide-cursor');
        cursorFollower.classList.add('hide-cursor');
    }, 3000);
});

// Search Functionality
searchTrigger.addEventListener('click', () => {
    searchContainer.classList.add('open');
    searchInput.focus();
});

searchClose.addEventListener('click', () => {
    searchContainer.classList.remove('open');
});

// Sample search functionality - can be expanded with real data
searchInput.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    
    if (searchValue.length < 2) {
        searchResults.innerHTML = '';
        return;
    }
    
    const searchItems = [
        { title: 'Quiz', description: 'Test your knowledge in tech domains', link: '#events' },
        { title: 'Photopia', description: 'Photography contest', link: '#events' },
        { title: 'WebAlgo', description: 'Web development competition', link: '#events' },
        { title: 'ReelRush', description: 'Short video contest', link: '#events' },
        { title: 'Debugging', description: 'Fix bugs in code', link: '#events' },
        { title: 'Contact Us', description: 'Get in touch with us', link: '#contact' }
    ];
    
    const filteredItems = searchItems.filter(item => 
        item.title.toLowerCase().includes(searchValue) || 
        item.description.toLowerCase().includes(searchValue)
    );
    
    if (filteredItems.length > 0) {
        searchResults.innerHTML = filteredItems.map(item => `
            <div class="search-result-item">
                <a href="${item.link}">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </a>
            </div>
        `).join('');
    } else {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
    }
});

// Animate elements when they come into view
function animateOnScroll() {
    // Event cards animation
    eventCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight * 0.85) {
            card.classList.add('show');
        }
    });
    
    // Contact animations
    if (contactInfo && contactInfo.getBoundingClientRect().top < window.innerHeight * 0.85) {
        contactInfo.classList.add('show');
    }
    
    if (contactForm && contactForm.getBoundingClientRect().top < window.innerHeight * 0.85) {
        contactForm.classList.add('show');
    }
}

// Trigger animations on page load
window.addEventListener('load', () => {
    // Create a slight delay for better effect
    setTimeout(() => {
        animateOnScroll();
    }, 500);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth'
            });
            
            // Close side menu if open
            sideMenu.classList.remove('open');
        }
    });
});

// Form submission (prevent default for demo)
document.querySelector('.contact-form form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submitted! (Demo only - no data is actually sent)');
    e.target.reset();
});