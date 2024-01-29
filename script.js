let timeoutId = null;

document.addEventListener('mousemove', (e) => {
    clearTimeout(timeoutId);

    const trail = document.createElement('div');
    trail.classList.add('trail');
    document.body.appendChild(trail);

    const duration = 350; // Duration of the trail (milliseconds)
    const initialSize = 20; // Initial size of the trail

    const draw = () => {
        const elapsed = performance.now() - start;
        const x = e.clientX;
        const y = e.clientY + window.scrollY; // Adjusting for scroll position

        trail.style.left = x - 10 + 'px'; // Adjusting the trail's width
        trail.style.top = y - 10 + 'px'; // Adjusting the trail's height

        trail.style.width = initialSize + 'px';
        trail.style.height = initialSize + 'px';
        trail.style.opacity = '1';

        // Gradually reducing the size and opacity over the trail
        const progress = elapsed / duration;
        const newSize = initialSize * Math.max(0, 1 - progress * 10);
        trail.style.width = newSize + 'px';
        trail.style.height = newSize + 'px';
        trail.style.opacity = Math.max(0, 1 - progress * 5);

        if (elapsed < duration) {
            requestAnimationFrame(draw);
        } else {
            trail.remove();
        }
    };

    const start = performance.now();
    requestAnimationFrame(draw);

    timeoutId = setTimeout(() => {
        trail.remove();
    }, duration); // Remove the trail after 'duration' milliseconds
});

document.addEventListener('mouseleave', () => {
    clearTimeout(timeoutId);
});

//--------------------------------------------------------------------------------------------------------

function toggleTheme() {
    const themeStyle = document.getElementById('theme-style');
    if (themeStyle.getAttribute('href') === 'style-light.css') {
      themeStyle.setAttribute('href', 'style.css');
    } else {
      themeStyle.setAttribute('href', 'style-light.css');
    }
  }