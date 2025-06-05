<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dr. Jaskirat Singh | Academic Portfolio</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" xintegrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" xintegrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <style>
    :root {
        /* Professional Dark Palette */
        --dark-primary-bg: #0A192F;       /* Deep Navy - Main Background */
        --dark-secondary-bg: #112240;     /* Slightly Lighter Navy - Card Backgrounds, Header Scroll */
        --dark-tertiary-bg: #233554;      /* Muted Navy/Slate - Borders, Subtle UI Elements */
        
        --light-primary-text: #CCD6F6;    /* Light Steel Blue - Primary Text */
        --light-secondary-text: #A8B2D1;  /* Lighter Steel Blue - Secondary/Muted Text */
        --light-tertiary-text: #8892B0;   /* Slate Blue - Even more muted text */

        --accent-primary: #64FFDA;        /* Bright Teal/Mint - CTAs, Active States */
        --accent-primary-darker: #52D8BC; /* Darker shade for hover/active */
        --accent-primary-rgb: 100, 255, 218;

        --accent-secondary: #FFD700;      /* Gold - Secondary Highlights, Icons (was #FFC300) */
        --accent-secondary-darker: #E6C300;/* Darker Gold for hover/active */
        --accent-secondary-rgb: 255, 215, 0;

        --text-on-accent-primary: var(--dark-primary-bg); /* Text on accent-primary buttons */

        /* Mapping old variables for smoother transition (can be phased out) */
        --primary: var(--accent-primary);
        --primary-light: var(--accent-primary);
        --primary-dark: var(--accent-primary-darker);
        --primary-rgb: var(--accent-primary-rgb);
        
        --secondary: var(--accent-secondary);
        --secondary-rgb: var(--accent-secondary-rgb);

        --accent: var(--accent-primary);
        --accent-rgb: var(--accent-primary-rgb);

        --dark: var(--dark-primary-bg);
        --dark-rgb: 10, 25, 47;
        --dark-secondary: var(--dark-secondary-bg);
        --dark-secondary-rgb: 17, 34, 64;
        --dark-tertiary: var(--dark-tertiary-bg);
        
        --light: var(--light-primary-text);
        --text-main: var(--light-primary-text);
        --text-muted: var(--light-secondary-text);
        --text-darker-muted: var(--light-tertiary-text);

        /* Neon re-mapping to new accents (use new semantic names where possible) */
        --neon-blue: var(--accent-primary);
        --neon-pink: var(--accent-secondary); /* Re-mapped pink to gold */
        --neon-green: var(--accent-primary);
        --neon-blue-rgb: var(--accent-primary-rgb);
        --neon-pink-rgb: var(--accent-secondary-rgb);
        --neon-green-rgb: var(--accent-primary-rgb);

        --light-primary: var(--light-primary-text);
        --light-secondary: var(--light-secondary-text);

        --glow-color: rgba(var(--accent-primary-rgb), 0.5); /* Default glow color */
    }

    ::selection {
      background-color: var(--accent-primary);
      color: var(--dark-primary-bg);
    }
    ::-moz-selection {
      background-color: var(--accent-primary);
      color: var(--dark-primary-bg);
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Inter', sans-serif;
        background: var(--dark-primary-bg); /* Solid dark background for deployment robustness */
        color: var(--light-primary-text);
        overflow-x: hidden;
        scroll-behavior: smooth;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: 'Playfair Display', serif;
        font-weight: 700;
        color: var(--light-primary-text);
    }
    h3, h4, h5, h6 { /* For sub-headings, allow Inter to be used for a more modern feel if specified by class */
        /* font-family: 'Inter', sans-serif; */
    }
    
    .glass-card {
        background: rgba(var(--dark-secondary-rgb), 0.65); 
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(var(--dark-tertiary-rgb), 0.25); 
        border-radius: 10px; /* Refined radius */
    }
    
    header .glass-card-header { /* Specific for header, styles managed in App.tsx for scroll behavior */
       transition: background 0.3s ease-out, backdrop-filter 0.3s ease-out, box-shadow 0.3s ease-out, padding 0.3s ease-out;
    }

    .gradient-text {
        background: linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .gradient-bg { /* Main CTA gradient using primary accent */
        background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-primary-darker) 100%);
        color: var(--text-on-accent-primary); /* Ensure good contrast */
        position: relative;
        overflow: hidden;
    }
    .gradient-bg::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 50%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent); /* More subtle shimmer */
        transition: left 0.7s ease-out;
    }
    .gradient-bg:hover::before {
        left: 150%;
    }
    
    .section-title-custom { 
      position: relative;
      display: inline-block; 
      padding-bottom: 10px;
      color: var(--light-primary-text);
      font-size: 2.15rem; /* Adjusted size */
      line-height: 2.65rem;
      font-family: 'Playfair Display', serif; /* Explicitly set for section titles */
    }
    .section-title-custom::after { 
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%; 
      transform: translateX(-50%); 
      width: 70px; 
      height: 3px; 
      background: var(--accent-primary); /* Solid primary accent for underline */
      border-radius: 1.5px;
    }
    
    .nav-link-custom {
        position: relative;
        padding: 0.55rem 1rem; 
        font-size: 0.875rem; /* text-sm */
        font-weight: 500; 
        color: var(--light-secondary-text);
        border-radius: 6px; 
        transition: all 0.2s ease-in-out;
        text-align: center;
    }
    .nav-link-custom:hover {
        color: var(--light-primary-text);
        background-color: rgba(var(--accent-primary-rgb), 0.08); /* Very subtle hover */
    }
    .nav-link-custom.active {
        color: var(--text-on-accent-primary);
        background: var(--accent-primary);
        font-weight: 600;
    }
    .nav-link-custom::after { content: none; }

    .hover-card { 
        transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
        transform: translateY(0) scale(1);
    }
    .hover-card:hover { 
        transform: translateY(-6px) scale(1.015); 
        box-shadow: 0 10px 20px -5px rgba(var(--dark-rgb), 0.25), 0 6px 12px -6px rgba(var(--accent-primary-rgb),0.2);
        border-color: rgba(var(--accent-primary-rgb), 0.4) !important;
    }
    
    /* Particles JS - Subtle Background Effect */
    #particles-js { 
        position: fixed; 
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2; /* Behind blobs */
        opacity: 0.08; /* Even more subtle */
    }

    /* Blob Animation - Restored and Restyled */
    .blob { 
        position: fixed; 
        width: 450px; /* Adjusted size */
        height: 450px;
        filter: blur(90px); /* Adjusted blur */
        z-index: -1; /* Behind content, above particles */
        opacity: 0.12; /* Subtle opacity */
        pointer-events: none;
    }
    .blob-1 { 
        background: var(--accent-primary); /* Use new accent-primary */
        top: -50px; /* Adjust positioning for visual effect */
        right: -50px;
        animation: move-morph-blob 30s infinite alternate ease-in-out;
    }
    .blob-2 { 
        background: var(--accent-secondary); /* Use new accent-secondary */
        bottom: -50px;
        left: -50px;
        animation: move-morph-blob 35s infinite alternate-reverse ease-in-out;
    }

    @keyframes move-morph-blob {
        0% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        }
        25% {
            transform: translate(70px, -50px) scale(1.15) rotate(90deg);
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
        }
        50% {
            transform: translate(140px, 15px) scale(0.95) rotate(180deg);
            border-radius: 70% 30% 50% 50% / 40% 70% 30% 60%;
        }
        75% {
            transform: translate(50px, 90px) scale(1.1) rotate(270deg);
            border-radius: 40% 70% 60% 30% / 70% 40% 50% 50%;
        }
        100% {
            transform: translate(0px, 0px) scale(1) rotate(360deg);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        }
    }
    
    /* Scrollbar */
    ::-webkit-scrollbar { width: 8px; height: 8px; } 
    ::-webkit-scrollbar-track { background: var(--dark-primary-bg); }
    ::-webkit-scrollbar-thumb { background: var(--dark-tertiary-bg); border-radius: 8px; border: 1.5px solid var(--dark-primary-bg); }
    ::-webkit-scrollbar-thumb:hover { background: var(--accent-primary); }

    /* FadeIn Animation */
    @keyframes fadeIn { 
      from { opacity: 0; transform: translateY(15px); } 
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.6s ease-out forwards; 
    }
    
    /* Focus Visible Outline */
    .focus-visible-outline:focus-visible {
        outline: 2px solid var(--accent-primary);
        outline-offset: 2px;
        border-radius: 4px; 
        box-shadow: 0 0 0 2.5px rgba(var(--accent-primary-rgb), 0.35);
    }
    .nav-link-custom.focus-visible-outline:focus-visible,
    .nav-link-custom.active.focus-visible-outline:focus-visible {
      outline-color: var(--dark-primary-bg);
      box-shadow: 0 0 0 2px rgba(var(--dark-primary-bg), 0.4);
    }

    /* Glows & Shadows */
    .text-shadow-accent {
        text-shadow: 0 0 6px rgba(var(--accent-primary-rgb), 0.6);
    }
    .shadow-glow-accent-primary {
      box-shadow: 0 0 10px rgba(var(--accent-primary-rgb), 0.2), 0 0 18px rgba(var(--accent-primary-rgb), 0.1);
    }
     .shadow-glow-accent-secondary {
      box-shadow: 0 0 10px rgba(var(--accent-secondary-rgb), 0.2), 0 0 18px rgba(var(--accent-secondary-rgb), 0.1);
    }

    /* PulseGlow Animation */
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 3px var(--glow-color), 0 0 7px var(--glow-color); opacity: 0.85; transform: scale(1); }
      50% { box-shadow: 0 0 7px var(--glow-color), 0 0 14px var(--glow-color); opacity: 1; transform: scale(1.02); }
    }
    .animate-pulseGlow {
        animation: pulseGlow 2.2s infinite ease-in-out;
    }

    /* Contact Input Styling */
    .contact-input {
      background-color: rgba(var(--dark-rgb), 0.4); /* Darker base */
      border: 1px solid var(--dark-tertiary-bg);
      color: var(--light-primary-text);
      border-radius: 6px; /* Consistent radius */
      transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
    }
    .contact-input:focus {
      border-color: var(--accent-primary);
      background-color: rgba(var(--dark-secondary-rgb), 0.5); /* Slightly lighten on focus */
      box-shadow: 0 0 0 2px rgba(var(--accent-primary-rgb), 0.25);
    }
    .contact-input::placeholder {
      color: var(--light-tertiary-text);
      opacity: 0.8;
    }

  </style>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@^19.1.0",
    "react-dom/": "https://esm.sh/react-dom@^19.1.0/",
    "react/": "https://esm.sh/react@^19.1.0/",
    "react-router-dom": "https://esm.sh/react-router-dom@6.23.1",
    "vite": "https://esm.sh/vite@^6.3.5",
    "@vitejs/plugin-react": "https://esm.sh/@vitejs/plugin-react@^4.5.0"
  }
}
</script>
<link rel="stylesheet" href="/index.css"> <!-- Ensure this path is correct if you have a separate index.css -->
</head>
<body class="bg-dark-primary-bg"> <!-- Ensured class matches variable for clarity -->
  <div id="particles-js"></div>
  
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>

  <div id="root"></div>
  <script type="module" src="/index.tsx"></script>
  
  <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
  <script>
    function initParticles() {
      if (typeof particlesJS !== 'undefined' && typeof getComputedStyle !== 'undefined') {
          // Get the computed RGB string for --accent-primary-rgb
          const accentPrimaryRgbString = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary-rgb').trim();
          
          // Construct the RGBA strings for particles.js configuration
          const particleColor = `rgba(${accentPrimaryRgbString}, 0.3)`;
          const lineColor = `rgba(${accentPrimaryRgbString}, 0.15)`;

          particlesJS('particles-js', {
              particles: {
                  number: { value: 40, density: { enable: true, value_area: 1000 } },
                  color: { value: particleColor }, 
                  shape: { type: "circle" },
                  opacity: { value: 0.25, random: true, anim: { enable: true, speed: 0.4, opacity_min: 0.05, sync: false } }, 
                  size: { value: 1.5, random: true, anim: { enable: false } }, 
                  line_linked: { enable: true, distance: 160, color: lineColor, opacity: 0.15, width: 0.8 }, 
                  move: { enable: true, speed: 0.6, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
              },
              interactivity: {
                  detect_on: "canvas",
                  events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: false }, resize: true }, 
                  modes: { grab: { distance: 110, line_linked: { opacity: 0.25 } } } 
              },
              retina_detect: true
          });
      } else {
          console.error("particlesJS or getComputedStyle not available, retrying particles init...");
          setTimeout(initParticles, 200);
      }
    }
    // Ensure DOM is fully loaded and styles are parsed before initializing particles
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParticles);
    } else {
        initParticles(); // DOMContentLoaded has already fired
    }
  </script>
</body>
</html>
