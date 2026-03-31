// --- Loading Screen & Initializing Sequence ---
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.progress-bar');
    const logsContainer = document.querySelector('.loading-logs');
    
    const logs = [
        "Initializing kernel...",
        "Loading rootkit modules...",
        "Establishing secure connection to mainframe...",
        "Bypassing firewall protocols...",
        "Access granted. Welcome, Swagotom."
    ];

    let progress = 0;
    let logIndex = 0;

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 10;
        if(progress > 100) progress = 100;
        progressBar.style.width = `${progress}%`;

        if(progress % 20 < 15 && logIndex < logs.length) {
            const p = document.createElement('p');
            p.textContent = `> ${logs[logIndex]}`;
            logsContainer.appendChild(p);
            logIndex++;
            logsContainer.scrollTop = logsContainer.scrollHeight;
        }

        if(progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    initTyping();
                    animateSkillBars(); // Only animate when visible
                }, 500);
            }, 800);
        }
    }, 200);
});

// --- Mouse Follow Light / Cursor Glow ---
const cursorGlow = document.getElementById('cursor-glow');
const isMobile = window.innerWidth <= 768;

if(!isMobile) {
    document.addEventListener('mousemove', (e) => {
        // Request animation frame for smooth movement
        requestAnimationFrame(() => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    });

    // Add interactive glow on clickable elements
    const interactables = document.querySelectorAll('a, button, .project-card, .service-card, .blog-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(el.classList.contains('red') || el.classList.contains('close-modal')) {
                cursorGlow.classList.add('interactive-danger');
            } else {
                cursorGlow.classList.add('interactive');
            }
        });
        el.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('interactive');
            cursorGlow.classList.remove('interactive-danger');
        });
    });
}

// --- Navigation Scroll Effect & Mobile Menu ---
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if(navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if(navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });
});

// Update active nav link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(a => {
        a.classList.remove('active');
        if(a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});


// --- Typing Animation (Hero Section) ---
const phrases = [
    "Cyber Security Expert",
    "AI Security Specialist",
    "Ethical Hacker",
    "Vulnerability Researcher"
];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let isTypingStarted = false;

function initTyping() {
    if(isTypingStarted) return;
    isTypingStarted = true;
    type();
}

function type() {
    const typedTextSpan = document.querySelector('.typed-text');
    if(!typedTextSpan) return;

    const currentPhrase = phrases[currentPhraseIndex];
    
    if(isDeleting) {
        typedTextSpan.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typedTextSpan.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 100;

    if(!isDeleting && currentCharIndex === currentPhrase.length) {
        typeSpeed = 2500; // Pause at end of phrase
        isDeleting = true;
    } else if(isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typeSpeed = 400; // Pause before new phrase
    }

    setTimeout(type, typeSpeed);
}

// --- Matrix Rain Effect (Canvas) ---
const matrixCanvas = document.getElementById('matrix-canvas');
const mCtx = matrixCanvas.getContext('2d');

function initMatrix() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
}
initMatrix();

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
let columns = matrixCanvas.width / fontSize;
let drops = [];

for(let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    // Translucent black background to show trail
    mCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    
    mCtx.fillStyle = '#0F0'; // Green text
    mCtx.font = fontSize + 'px monospace';

    for(let i = 0; i < drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        
        // Highlight leading character randomly
        mCtx.fillStyle = Math.random() > 0.95 ? '#fff' : '#00ff9f';
        
        mCtx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if(drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 35);

// --- Interactive Particles Background ---
const particlesCanvas = document.getElementById('particles-canvas');
const pCtx = particlesCanvas.getContext('2d');

function initParticlesSize() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
}
initParticlesSize();

let particlesArray = [];
const mouse = { x: null, y: null, radius: 100 };

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        pCtx.beginPath();
        pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        pCtx.fillStyle = this.color;
        pCtx.fill();
    }
    update() {
        // Bounce off edges
        if(this.x > particlesCanvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if(this.y > particlesCanvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Mouse interaction (repel)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);

        if(distance < mouse.radius) {
            if(mouse.x < this.x && this.x < particlesCanvas.width - this.size * 10) {
                this.x += 2.5;
            }
            if(mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 2.5;
            }
            if(mouse.y < this.y && this.y < particlesCanvas.height - this.size * 10) {
                this.y += 2.5;
            }
            if(mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 2.5;
            }
        }
        
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (particlesCanvas.height * particlesCanvas.width) / 12000;
    
    // Cap for performance
    if(numberOfParticles > 150) numberOfParticles = 150;
    if(isMobile) numberOfParticles = 50;

    for(let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 0.5;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = Math.random() > 0.5 ? '#00ff9f' : 'rgba(0, 234, 255, 0.5)';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connectParticles() {
    let opacityValue = 1;
    for(let a = 0; a < particlesArray.length; a++) {
        for(let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                           ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if(distance < (particlesCanvas.width/10) * (particlesCanvas.height/10)) {
                opacityValue = 1 - (distance / 12000);
                pCtx.strokeStyle = 'rgba(0, 255, 159,' + opacityValue/3 + ')';
                pCtx.lineWidth = 0.5;
                pCtx.beginPath();
                pCtx.moveTo(particlesArray[a].x, particlesArray[a].y);
                pCtx.lineTo(particlesArray[b].x, particlesArray[b].y);
                pCtx.stroke();
            }
        }
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    pCtx.clearRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    initMatrix();
    columns = matrixCanvas.width / fontSize;
    drops = [];
    for(let x = 0; x < columns; x++) drops[x] = 1;
    
    initParticlesSize();
    initParticles();
});

// --- Scroll Reveal Animation ---
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
            
            // Trigger skill bars animation if about section is revealed
            if(reveals[i].classList.contains('about-section')) {
                animateSkillBars();
            }
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Initial check

function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        fill.style.width = width;
    });
}

// --- Project Filtering ---
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if(filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
                // Brief timeout for animation re-flow
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.classList.add('hidden');
                card.style.opacity = '0';
            }
        });
    });
});

// --- Modal Popup System ---
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');
const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const projectData = JSON.parse(btn.getAttribute('data-project'));
        document.getElementById('modal-title').textContent = projectData.title;
        
        modalBody.innerHTML = `
            <h2>${projectData.title}</h2>
            <p>${projectData.desc}</p>
            <div style="color: var(--primary-neon); margin-bottom: 20px;">> Connection to external media established</div>
            <iframe class="modal-video" src="${projectData.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
    setTimeout(() => modalBody.innerHTML = '', 300); // Clear content after transition
});

modal.addEventListener('click', (e) => {
    if(e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => modalBody.innerHTML = '', 300);
    }
});

// --- Fake Network Terminal ---
function initNetworkTerminal() {
    const terminal = document.getElementById('network-terminal');
    if(!terminal) return;
    
    const statusLines = [
        "> Ping Swagotom_Node...",
        "<span style='color:var(--primary-neon);'>[OK] Node Active. 0% packet loss.</span>",
        "> Fetching public encryption keys...",
        "<span class='text-muted'>RSA 4096-bit key retrieved. Secure channel established.</span>",
        "> Verifying certificates...",
        "<span style='color:var(--primary-neon);'>[VERIFIED] Identity Confirmed: 0xVedantFlow</span>",
        "> Connection status:",
        "<span class='glitch-text' data-text='AWAITING HANDSHAKE...' style='color:var(--secondary-neon);'>AWAITING HANDSHAKE...</span>",
        "> <span class='blinking-cursor'>_</span>"
    ];
    
    let currentLine = 0;
    terminal.innerHTML = "";
    
    function writeLine() {
        if(currentLine >= statusLines.length) return;
        
        const p = document.createElement('p');
        p.innerHTML = statusLines[currentLine];
        terminal.appendChild(p);
        currentLine++;
        
        setTimeout(writeLine, Math.random() * 600 + 200);
    }
    
    // Start after a slight delay
    setTimeout(writeLine, 1500);
}

// Ensure it starts when in view
let networkInit = false;
window.addEventListener('scroll', () => {
    const term = document.getElementById('network-terminal');
    if(!term) return;
    const rect = term.getBoundingClientRect();
    if(rect.top < window.innerHeight && !networkInit) {
        networkInit = true;
        initNetworkTerminal();
    }
});
