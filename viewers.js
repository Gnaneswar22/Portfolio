    document.addEventListener('DOMContentLoaded', function() {
        const viewCountElement = document.getElementById('viewCount');
        let viewCount = localStorage.getItem('portfolioViews') || 0;
        viewCount = parseInt(viewCount) + 1;
        
        // Animate counting up
        const duration = 1500;
        const steps = 30;
        const increment = viewCount / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if(current >= viewCount) {
                current = viewCount;
                clearInterval(timer);
            }
            viewCountElement.textContent = Math.floor(current).toLocaleString();
        }, duration / steps);
        
        localStorage.setItem('portfolioViews', viewCount);
    });


    document.addEventListener('DOMContentLoaded', function() {
        const viewCountElement = document.getElementById('viewCount');
        let viewCount = localStorage.getItem('portfolioViews') || 0;
        viewCount = parseInt(viewCount) + 1;
        
        // Animate counting up
        const duration = 1500;
        const steps = 30;
        const increment = viewCount / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if(current >= viewCount) {
                current = viewCount;
                clearInterval(timer);
            }
            viewCountElement.textContent = Math.floor(current).toLocaleString();
        }, duration / steps);
        
        localStorage.setItem('portfolioViews', viewCount);
    });

