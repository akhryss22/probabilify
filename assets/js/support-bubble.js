document.addEventListener('DOMContentLoaded', function() {
    const contextTip = document.getElementById('context-tip');
    const sections = {
        'mbti-test': {
            selector: '#mbti-section',
            tip: 'Discover your learning style! Take our quick MBTI assessment to get personalized learning recommendations.',
            icon: '🎯'
        },
        'learning-paths': {
            selector: '#learning-paths-section',
            tip: 'Explore different learning paths tailored to your personality type!',
            icon: '🎓'
        },
        'statistics': {
            selector: '#statistics-section',
            tip: 'Need help with Statistics? Our AI tutor can help explain concepts step by step.',
            icon: '📊'
        },
        'probability': {
            selector: '#probability-section',
            tip: 'Struggling with Probability? Ask our AI tutor for practice problems and solutions.',
            icon: '🎲'
        },
        'team': {
            selector: '#team',
            tip: 'Want to get in touch? Feel free to email any of our team members!',
            icon: '👥'
        },
        'chatbot': {
            selector: '.chat-container',
            tip: 'Upload an image of your math problem or type your question for instant help!',
            icon: '🤖'
        }
    };

    // Track mouse movement for section detection
    document.addEventListener('mousemove', function(e) {
        const target = e.target;
        
        // Check which section the user is hovering
        for (const [key, value] of Object.entries(sections)) {
            const section = document.querySelector(value.selector);
            if (section && section.contains(target)) {
                showContextTip(value.tip, value.icon);
                return;
            }
        }
        
        // Hide tip if not hovering any relevant section
        hideContextTip();
    });

    function showContextTip(message, icon) {
        contextTip.innerHTML = `${icon} ${message}`;
        contextTip.classList.add('show');
    }

    function hideContextTip() {
        contextTip.classList.remove('show');
    }

    // Handle bubble click
    const bubbleButton = document.querySelector('.bubble-button');
    bubbleButton.addEventListener('click', function() {
        // Redirect to chatbot or open chat interface
        window.location.href = 'chatbot.html';
    });
}); 