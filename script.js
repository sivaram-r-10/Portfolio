// --- 1. Navigation Scroll Spy, Mobile Menu & Dynamic Glass Navbar ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar'); // Select the nav

window.addEventListener('scroll', () => {
    let current = '';

    // Add frosted glass effect to navbar when scrolled
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        
        // Check if we have scrolled past this section
        if (scrollY >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Close Mobile Menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.checked = false; 
    });
});


// --- 2. Projects Modal Logic ---
// Updated Project Data directly from your PDF specifications.
// Notice the new 'videos' array. You can add .mp4 paths there just like images.
const projectData = {
    "project1": {
        title: "Thermal Energy Storage Air Conditioning System",
        description: "Designed and developed an Ice Storage Air Conditioning (ISAC) System operating on the Vapor Compression Refrigeration (VCR) cycle using eco-friendly R-600a refrigerant. The system freezes water during off-peak hours to act as a thermal reservoir, later circulating chilled water for air conditioning. Experimental testing showed the system maintained an indoor air temperature of 20°C for nearly four hours during discharge, achieving a Coefficient of Performance (COP) of 0.36, effectively shifting energy consumption to off-peak hours.",
        images: ["Project-1.2.jpg", "Project-1.3.jpg"], 
        videos: [], 
        tech: "Thermodynamics, VCR Cycle, R-600a Refrigerant, Heat Transfer, Prototyping"
    },
    "project2": {
        title: "Waste Cold Water Heat Exchanger System",
        description: "Designed a cold energy recovery system to utilize waste cold water from fish processing plants. Utilized SolidWorks for forward and reverse engineering to create a compact, food-grade shell and tube heat exchanger. The system recovers thermal energy from 4°C waste meltwater to pre-cool 36°C municipal water, achieving a 15°C temperature drop. This significantly reduces refrigeration loads on the ice plant, lowering electricity consumption and promoting industrial sustainability.",
        images: [], 
        videos: ["Project-2 video.mp4"], 
        tech: "SolidWorks, Fluid Dynamics, Shell and Tube Heat Exchanger, Reverse Engineering, Prototyping"
    },
    "project3": {
        title: "Cricket Helmet Impact Test in Explicit Dynamics",
        description: "Performed a finite element analysis (FEA) to evaluate the structural integrity of a polycarbonate cricket helmet under high-velocity impact. Using ANSYS Explicit Dynamics, I simulated an oak wood ball striking the helmet at 10,000 mm/s. The study analyzed stress distribution, deformation, and energy absorption, confirming a Factor of Safety (FOS) above 1.5. The project followed BS 7928:2013 standards to ensure the design effectively protects players from high-speed ball strikes.",
        images: ["Project-3.1.png", "Project-3.2.png", "Project-3.3.png", "Project-3.4.png"], // Based on Fig 2 and Fig 7 in your report
        videos: [], 
        tech: "ANSYS Workbench, Explicit Dynamics, Finite Element Analysis (FEA), SolidWorks, Material Science (Polycarbonate & Oak)"
    }
};

const projectItems = document.querySelectorAll('.project-item');
const projectModal = document.getElementById('projectModal');
const closeModalBtn = document.getElementById('closeModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalDataContainer = document.getElementById('modalDataContainer');

function openProjectModal(projectId) {
    const data = projectData[projectId]; 

    if (!data) return;

    // Build the dynamic media HTML
    let mediaHTML = '';
    
    // 1. Map through images if they exist
    if (data.images && data.images.length > 0) {
        mediaHTML += data.images.map(img => `<img src="${img}" alt="${data.title} image">`).join('');
    }
    
    // 2. Map through videos if they exist
    if (data.videos && data.videos.length > 0) {
        mediaHTML += data.videos.map(vid => `<video controls src="${vid}" alt="${data.title} video"></video>`).join('');
    }

    modalDataContainer.innerHTML = `
        <h2>${data.title}</h2>
        <div class="project-details">
            <p><strong>Description:</strong> ${data.description}</p>
            <div class="project-images-row">
                ${mediaHTML}
            </div>
            <p><strong>Technologies:</strong> ${data.tech}</p>
        </div>
    `;

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden'; 
}

function closeProjectModal() {
    projectModal.classList.remove('open');
    document.body.style.overflow = ''; 
    
    // Optional: Stop video playback when closing the modal
    const videos = modalDataContainer.querySelectorAll('video');
    videos.forEach(video => video.pause());
}

projectItems.forEach(item => {
    item.addEventListener('click', () => {
        const projectId = item.getAttribute('data-project');
        openProjectModal(projectId);
    });
});

closeModalBtn.addEventListener('click', closeProjectModal);
modalOverlay.addEventListener('click', closeProjectModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('open')) {
        closeProjectModal();
    }
});


// --- 3. Intersection Observer for Scroll Animations ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Triggers when 15% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
// --- Glittering Stars Logic ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 100; 

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) {
            star.speed = -star.speed; 
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}
animateStars();