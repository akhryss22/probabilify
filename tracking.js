// Create a new file called tracking.js
const trackPageView = async () => {
    try {
        const user = firebase.auth().currentUser;
        if (!user) return;

        await db.collection('user_activity').add({
            userId: user.uid,
            userEmail: user.email,
            action: 'page_view',
            page: window.location.pathname,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error("Error tracking page view:", error);
    }
};

const trackButtonClick = async (buttonName) => {
    try {
        const user = firebase.auth().currentUser;
        if (!user) return;

        await db.collection('user_activity').add({
            userId: user.uid,
            userEmail: user.email,
            action: 'button_click',
            buttonName: buttonName,
            page: window.location.pathname,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error("Error tracking button click:", error);
    }
};

// Track page view when loaded
document.addEventListener('DOMContentLoaded', trackPageView);

// Add click tracking to all buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button, .button, a');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim();
            trackButtonClick(buttonText);
        });
    });
});

// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "probabilify.firebaseapp.com",
    projectId: "probabilify",
    storageBucket: "probabilify.firebasestorage.app",
    messagingSenderId: "214477200156",
    appId: "1:214477200156:web:ded26b618399b4363e38d9",
    measurementId: "G-VWDXCCV19Z"
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore(); 
