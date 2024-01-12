document.addEventListener("DOMContentLoaded", function() {
    // Create the floating window div
    var floatingWindow = document.createElement("div");
    floatingWindow.id = "floatingWindow";
    document.body.appendChild(floatingWindow);

    // Create the page load time div
    var pageLoadTimeDiv = document.createElement("div");
    pageLoadTimeDiv.id = "pageLoadTime";
    floatingWindow.appendChild(pageLoadTimeDiv);

    // Create the current time div
    var currentTimeDiv = document.createElement("div");
    currentTimeDiv.id = "currentTime";
    currentTimeDiv.innerHTML = "Current Time: --:--:--";
    floatingWindow.appendChild(currentTimeDiv);

    // Create the timer div
    var timerDiv = document.createElement("div");
    timerDiv.id = "timer";
    timerDiv.innerHTML = "Time since page loaded: 0 seconds";
    floatingWindow.appendChild(timerDiv);

    // Create the pause button
    var pauseButton = document.createElement("button");
    pauseButton.innerHTML = "Pause Updates";
    floatingWindow.appendChild(pauseButton);

    // Add styles to the floating window
    var styles = `
        #floatingWindow {
            position: fixed;
            bottom: 10px;
            right: 10px;
            background-color: white;
            border: 1px solid black;
            padding: 10px;
            z-index: 1000;
        }
        #floatingWindow button {
            margin-top: 5px;
        }
    `;
    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Function to format time
    function formatTime(date) {
        var hours = String(date.getHours()).padStart(2, '0');
        var minutes = String(date.getMinutes()).padStart(2, '0');
        var seconds = String(date.getSeconds()).padStart(2, '0');
        return hours + ":" + minutes + ":" + seconds;
    }

    // Record and display page load time
    var pageLoadTime = new Date();
    pageLoadTimeDiv.innerHTML = "Page Load Time: " + formatTime(pageLoadTime);

    // Interval IDs for stopping the intervals
    var currentTimeInterval;
    var timerInterval;

    // Function to update current time
    function updateTime() {
        var now = new Date();
        currentTimeDiv.innerHTML = "Current Time: " + formatTime(now);
    }

    // Function to update timer
    function updateTimer() {
        var now = new Date();
        var secondsSinceLoad = Math.floor((now - pageLoadTime) / 1000);
        timerDiv.innerHTML = "Time since page loaded: " + secondsSinceLoad + " seconds";
    }

    // Start updating time
    function startIntervals() {
        currentTimeInterval = setInterval(updateTime, 1000);
        timerInterval = setInterval(updateTimer, 1000);
        pauseButton.innerHTML = "Pause Updates";
    }

    // Stop updating time
    function stopIntervals() {
        clearInterval(currentTimeInterval);
        clearInterval(timerInterval);
        pauseButton.innerHTML = "Resume Updates";
    }

    // Toggle the intervals on button click
    var isPaused = false;
    pauseButton.addEventListener("click", function() {
        if (isPaused) {
            startIntervals();
            isPaused = false;
        } else {
            stopIntervals();
            isPaused = true;
        }
    });

    // Initialize the intervals
    startIntervals();
});
