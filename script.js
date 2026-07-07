/**
 * Interactive Architectural Frontend Script Matrix
 * Orchestrates WebGL Space Contexts, Layout Navigation Transitions, & Dynamic UI Effects
 */

document.addEventListener('DOMContentLoaded', () => {
    initWebGLSpace();
    initNavigationEffects();
    initTypingEngine();
});

/**
 * Three.js Powered WebGL Particle Space Engine Implementation
 * Renders high-frame-rate spatial particle dust loops and volumetric field arrays
 */
function initWebGLSpace() {
    const canvas = document.getElementById('space-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 30;

    // Build Spatial Particle Geometry Array Maps
    const particleCount = window.innerWidth < 768 ? 400 : 900;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const customScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
        // Distribute array maps uniformly within coordinate space spans
        positions[i] = (Math.random() - 0.5) * 70;
        positions[i+1] = (Math.random() - 0.5) * 70;
        positions[i+2] = (Math.random() - 0.5) * 50;
        customScales[i/3] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('customScale', new THREE.BufferAttribute(customScales, 1));

    // Construct Volumetric Vector Mesh Material Configuration (Procedural Circle Textures)
    const material = new THREE.PointsMaterial({
        color: 0x00E5FF,
        size: 0.28,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const starParticles = new THREE.Points(geometry, material);
    scene.add(starParticles);

    // Dynamic Interaction Trapping
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    window.addEventListener('mousemove', (event) => {
        targetMouseX = (event.clientX / window.innerWidth) - 0.5;
        targetMouseY = (event.clientY / window.innerHeight) - 0.5;
    });

    // Resize Pipeline Event Handling
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();

    // Core Animation Frame Loop Execution Matrix
    function tick() {
        const elapsedTime = clock.getElapsedTime();

        // Standardized drifting orbital movement models
        starParticles.rotation.y = elapsedTime * 0.02;
        starParticles.rotation.x = elapsedTime * 0.01;

        // Apply smooth interpolation mapping to user coordinate capture data arrays
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        starParticles.position.x = currentMouseX * 4;
        starParticles.position.y = -currentMouseY * 4;

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
    
    tick();
}

/**
 * Handle Header Scroll Blending and Responsive Dropdown Layout States
 */
function initNavigationEffects() {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.remove('border-white/0', 'backdrop-blur-0');
            navbar.classList.add('bg-[#050816]/70', 'border-white/10', 'backdrop-blur-xl', 'shadow-xl');
        } else {
            navbar.classList.remove('bg-[#050816]/70', 'border-white/10', 'backdrop-blur-xl', 'shadow-xl');
            navbar.classList.add('border-white/0', 'backdrop-blur-0');
        }
    });

    function toggleMenu() {
        mobileMenu.classList.toggle('hidden');
    }

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', toggleMenu);
        mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));
    }
}

/**
 * Micro-Engine Component for Typewriter Array Sequence Updates
 */
function initTypingEngine() {
    const element = document.getElementById('typing-element');
    if (!element) return;

    const phrases = ["MCA Postgrad Student", "Full Stack Web Developer", "AI Technologies Enthusiast"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function runLoop() {
        const currentString = phrases[phraseIndex];
        
        if (isDeleting) {
            element.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentString.length) {
            speed = 1800; // Hold phrase visible
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400; // Pause transition
        }

        setTimeout(runLoop, speed);
    }

    runLoop();
}
