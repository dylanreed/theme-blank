document.addEventListener('DOMContentLoaded', function() {
  // Add flicker effect to neon elements
  function addFlickerEffect() {
    const neonElements = document.querySelectorAll('.site-title, h1, h2, h3');
    
    neonElements.forEach(element => {
      // Only apply effect randomly to some elements
      if (Math.random() > 0.7) {
        setTimeout(() => {
          element.classList.add('flicker');
          
          // Remove the effect after it completes
          setTimeout(() => {
            element.classList.remove('flicker');
            
            // Schedule next flicker
            setTimeout(addFlickerEffect, Math.random() * 10000);
          }, 1000);
        }, Math.random() * 5000);
      }
    });
  }
  
  // Initialize flicker effect
  addFlickerEffect();
  
  // Add hover glitch effect to post titles
  const postTitles = document.querySelectorAll('.post-title, .site-title');
  postTitles.forEach(title => {
    title.addEventListener('mouseover', function() {
      this.classList.add('glitch-hover');
    });
    
    title.addEventListener('mouseout', function() {
      this.classList.remove('glitch-hover');
    });
  });
  
  // Add "digital noise" effect to the background occasionally
  function addDigitalNoise() {
    const noise = document.createElement('div');
    noise.classList.add('digital-noise');
    document.body.appendChild(noise);
    
    setTimeout(() => {
      noise.remove();
      if (Math.random() > 0.7) {
        setTimeout(addDigitalNoise, Math.random() * 20000);
      }
    }, 200);
  }
  
  // Trigger digital noise occasionally
  setTimeout(addDigitalNoise, 10000);
  
  // Add hackertype effect on page load
  function typeOutElement(element) {
    const text = element.textContent;
    const speed = 30; // ms per character
    
    if (text.length > 15 && Math.random() > 0.9) { // Only apply to longer text elements and randomly
      element.textContent = '';
      element.classList.add('hacker-text');
      
      let i = 0;
      function typeChar() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeChar, speed);
        } else {
          element.classList.remove('hacker-text');
        }
      }
      
      typeChar();
    }
  }
  
  // Apply typing effect to some paragraph elements
  document.querySelectorAll('p').forEach(p => {
    if (Math.random() > 0.9) {
      typeOutElement(p);
    }
  });
  
  // Add CSS for the effects
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .flicker {
      animation: neon-flicker 1s ease-in-out;
    }
    
    @keyframes neon-flicker {
      0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
        opacity: 1;
        text-shadow: 0 0 5px var(--neon-blue), 0 0 10px var(--neon-blue), 0 0 15px var(--neon-blue);
      }
      20%, 24%, 55% {
        opacity: 0.5;
        text-shadow: none;
      }
    }
    
    .glitch-hover {
      animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
    }
    
    .digital-noise {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("https://github.com/dylanreed/theme-blank/blob/master/theme/public/background.png");
      opacity: 0.05;
      pointer-events: none;
      z-index: 9000;
      animation: digitalNoise 0.2s steps(2) forwards;
    }
    
    @keyframes digitalNoise {
      0% { opacity: 0.05; }
      25% { opacity: 0.1; }
      50% { opacity: 0.05; }
      75% { opacity: 0.15; }
      100% { opacity: 0; }
    }
    
    .hacker-text {
      color: var(--neon-green);
      position: relative;
    }
    
    .hacker-text::after {
      content: '|';
      position: absolute;
      right: -10px;
      animation: blink 0.7s infinite;
    }
    
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `;
  
  document.head.appendChild(styleElement);
});
