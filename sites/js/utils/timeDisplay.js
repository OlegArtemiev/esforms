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

    // Create a button to capture the current time
    var captureButton = document.createElement("button");
    captureButton.innerHTML = "Capture Current Time";
    floatingWindow.appendChild(captureButton);

    // Create a div to display captured times
    var capturedTimesDiv = document.createElement("div");
    capturedTimesDiv.id = "capturedTimes";
    floatingWindow.appendChild(capturedTimesDiv);

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
        #capturedTimes {
            margin-top: 10px;
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

    // Function to capture current time
    captureButton.onclick = function() {
        var now = new Date();
        var capturedTime = document.createElement("div");
        capturedTime.innerHTML = "Captured Time: " + formatTime(now);
        capturedTimesDiv.appendChild(capturedTime);
    };

    // Update time every second
    setInterval(updateTime, 500);
    setInterval(updateTimer, 500);
});
