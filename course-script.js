// --- Cinematic Loading Screen & Initializing Sequence ---
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if(!loadingScreen) return;
    const logs = [
        document.getElementById('cinematic-1'),
        document.getElementById('cinematic-2'),
        document.getElementById('cinematic-3')
    ];
    setTimeout(() => { if(logs[0]) logs[0].classList.add('visible'); }, 300);
    setTimeout(() => { if(logs[1]) logs[1].classList.add('visible'); }, 1200);
    setTimeout(() => { if(logs[2]) logs[2].classList.add('visible'); }, 2200);
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }, 3200);
});


// --- Typewriter Effect ---
const subtitleText = "From Beginner to Hacker Mindset";
const subtitleElement = document.querySelector('.typed-course-subtitle');
let i = 0;

function typeSubtitle() {
    if(!subtitleElement) return;
    if (i < subtitleText.length) {
        subtitleElement.textContent += subtitleText.charAt(i);
        i++;
        setTimeout(typeSubtitle, 80);
    }
}
setTimeout(typeSubtitle, 3500); // Delay typing until loading screen fades

// --- Accordion Logic ---
window.togglePhase = function(element) {
    const block = element.parentElement;
    const content = element.nextElementSibling;
    
    // Toggle Active Class
    block.classList.toggle('active');
    
    // Toggle max-height for accordion effect
    if (block.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + "px";
    } else {
        content.style.maxHeight = "0";
    }
}

// --- Scroll Reveal ---
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var j = 0; j < reveals.length; j++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[j].getBoundingClientRect().top;
        var elementVisible = 50;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[j].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal();

// --- Matrix Rain Effect (Canvas) ---
const canvas = document.getElementById('course-bg-canvas');
if(canvas) {
    const ctx = canvas.getContext('2d');

    function initMatrix() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    initMatrix();

    const katakana = '01';
    const latin = '010101111000';
    const nums = '0123456789ABCDEF!@#$%&*';
    const alphabet = katakana + latin + nums;

    const fontSize = window.innerWidth <= 768 ? 20 : 16;
    let columns = canvas.width / fontSize;
    if (window.innerWidth <= 768) {
        columns = Math.min(columns, 30); // Less columns on mobile
    }
    let drops = [];

    for(let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for(let j = 0; j < drops.length; j++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, j * fontSize, drops[j] * fontSize);
            
            if(drops[j] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[j] = 0;
            }
            drops[j]++;
        }
    }
    setInterval(drawMatrix, 30);

    window.addEventListener('resize', () => {
        initMatrix();
    });
}

// --- Security & Anti-Inspect (Hacker Theme) ---
document.addEventListener('contextmenu', e => {
    e.preventDefault();
    console.log("%c[ACCESS DENIED] Unauthorized inspection attempt logged.", "color: #ff003c; font-size: 20px; font-weight: bold; background: #000; padding: 10px; border: 1px solid #ff003c;");
});

document.addEventListener('keydown', e => {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J, Ctrl+U
    if(e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        console.log("%c[SECURITY ALERT] Key combination blocked.", "color: #00ff9f; font-size: 16px;");
    }
});
