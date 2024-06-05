// Set initial variables for study and break durations, session counts, and timer state
let studyDuration = 25 * 60; // Default study duration is 25 minutes
let breakDuration = 5 * 60; // Default break duration is 5 minutes
let studyCount = 0;
let breakCount = 0;
let isRunning = false;

// Select DOM elements for display and buttons
const timerDisplay = document.getElementById("timer-display");
const studyButton = document.getElementById("study-btn");
const breakButton = document.getElementById("break-btn");
const startStopButton = document.getElementById("start-stop-btn");
const studyCountElement = document.getElementById("study-count");
const breakCountElement = document.getElementById("break-count");
const lightThemeButton = document.getElementById("light-theme");
const darkThemeButton = document.getElementById("dark-theme");

// Function to update the timer display with remaining time
function updateTimerDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.innerHTML = `${minutes}m : ${seconds}s`;
}

// Function to start or stop the timer
function toggleTimer() {
    if (isRunning) {
        // Stop the timer
        clearInterval(timerId);
        startStopButton.innerHTML = "Start";
    } else {
        // Start the timer
        let timeLeft = studyDuration;
        if (breakButton.classList.contains("active")) {
            timeLeft = breakDuration;
        }
        updateTimerDisplay(timeLeft);
        timerId = setInterval(() => {
            timeLeft--;
            if (timeLeft === 0) {
                // End of timer, switch to next session type and reset timer
                if (breakButton.classList.contains("active")) {
                    studyCount++;
                    studyButton.click();
                } else {
                    breakCount++;
                    breakButton.click();
                }
                timeLeft = studyDuration;
                updateTimerDisplay(timeLeft);
            } else {
                updateTimerDisplay(timeLeft);
            }
        }, 1000);
        startStopButton.innerHTML = "Stop";
    }
    isRunning = !isRunning;
}

// Function to handle study button clicks
function studyButtonClick() {
    studyCount++;
    studyButton.classList.add("active");
    breakButton.classList.remove("active");
    startStopButton.style.display = "inline-block";
    themeSelector.style.display = "none";
    updateSessionCount();
}

// Function to handle break button clicks
function breakButtonClick() {
    breakCount++;
    breakButton.classList.add("active");
    studyButton.classList.remove("active");
    startStopButton.style.display = "inline-block";
    themeSelector.style.display = "none";
    updateSessionCount();
}

// Function to update session count display
function updateSessionCount() {
    studyCountElement.innerHTML = `Study Sessions: ${studyCount}`;
    breakCountElement.innerHTML = `Break Sessions: ${breakCount}`;
}

// Function to handle theme button clicks
function toggleTheme() {
    if (darkThemeButton.classList.contains("active")) {
        // Switch to light theme
        darkThemeButton.classList.remove("active");
        lightThemeButton.classList.add("active");
        document.body.classList.remove("dark");
        document.body.classList.add("light");
    } else {
        // Switch to dark theme
        lightThemeButton.classList.remove("active");
        darkThemeButton.classList.add("active");
        document.body.classList.remove("light");
        document.body.classList.add("dark");
    }
}

// Initialize study button as active and hide theme selector
studyButton.classList.add("active");
themeSelector.style.display = "none";

// Add event listeners for buttons
studyButton.addEventListener("click", studyButtonClick);
breakButton.addEventListener("click", breakButtonClick);
