// Firebase configuration
const firebaseConfig = {
    // You'll need to replace these with your Firebase project details
    apiKey: "AIzaSyD2qJ9NwQWJKEYQZzedyX_WQwYi1MSeCDQ",
    authDomain: "cursor-visitor-waffle.firebaseapp.com",
    databaseURL: "https://cursor-visitor-waffle-default-rtdb.firebaseio.com/",
    projectId: "cursor-visitor-waffle",
    storageBucket: "cursor-visitor-waffle.firebasestorage.app",
    messagingSenderId: "240875455283",
    appId: "1:240875455283:web:16b4cdcb48896a3c4b3446",
  measurementId: "G-BD51CTJ0P8"
};

// Constants
const DAYS_IN_YEAR = 365;
const CELLS = DAYS_IN_YEAR;
const LEVELS = {
    0: '0',
    1: '1-3',
    2: '4-6',
    3: '7-9',
    4: '10+'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Initialize the waffle chart
function initializeWaffleChart() {
    const waffleChart = document.getElementById('waffle-chart');
    
    for (let i = 0; i < CELLS; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell level-0';
        cell.setAttribute('data-date', getDateFromIndex(i));
        cell.title = `Date: ${getDateFromIndex(i)}\nVisits: 0`;
        waffleChart.appendChild(cell);
    }
}

// Get date from index
function getDateFromIndex(index) {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() - (CELLS - 1) + index);
    return date.toISOString().split('T')[0];
}

// Update cell color based on visit count
function updateCellColor(cell, visits) {
    const level = visits === 0 ? 0 :
                 visits <= 3 ? 1 :
                 visits <= 6 ? 2 :
                 visits <= 9 ? 3 : 4;
    
    cell.className = `cell level-${level}`;
    cell.title = `Date: ${cell.getAttribute('data-date')}\nVisits: ${visits}`;
}

// Track visit
async function trackVisit() {
    const today = new Date().toISOString().split('T')[0];
    const visitsRef = database.ref(`visits/${today}`);
    
    try {
        const snapshot = await visitsRef.once('value');
        const currentVisits = snapshot.val() || 0;
        await visitsRef.set(currentVisits + 1);
        updateVisitDisplay();
    } catch (error) {
        console.error('Error tracking visit:', error);
    }
}

// Update visit display
async function updateVisitDisplay() {
    const cells = document.querySelectorAll('.cell');
    const visitsRef = database.ref('visits');
    
    try {
        const snapshot = await visitsRef.once('value');
        const visits = snapshot.val() || {};
        
        cells.forEach(cell => {
            const date = cell.getAttribute('data-date');
            const visitCount = visits[date] || 0;
            updateCellColor(cell, visitCount);
        });
    } catch (error) {
        console.error('Error updating visit display:', error);
    }
}

// Initialize the chart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeWaffleChart();
    trackVisit();
    
    // Set up real-time updates
    database.ref('visits').on('value', () => {
        updateVisitDisplay();
    });
}); 