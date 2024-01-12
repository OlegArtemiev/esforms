document.addEventListener("DOMContentLoaded", function() {
    // Create the floating window div
    var floatingWindow = document.createElement("div");
    floatingWindow.id = "floatingWindow";
    document.body.appendChild(floatingWindow);

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
    `;
    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Function to update time
    function updateTime() {
        var now = new Date();
        var hours = String(now.getHours()).padStart(2, '0');
        var minutes = String(now.getMinutes()).padStart(2, '0');
        var seconds = String(now.getSeconds()).padStart(2, '0');
        currentTimeDiv.innerHTML = "Current Time: " + hours + ":" + minutes + ":" + seconds;
    }

    // Function to update timer
    function updateTimer() {
        var now = new Date();
        var secondsSinceLoad = Math.floor((now - pageLoadTime) / 1000);
        timerDiv.innerHTML = "Time since page loaded: " + secondsSinceLoad + " seconds";
    }

    // Record page load time
    var pageLoadTime = new Date();

    // Update time every second
    setInterval(updateTime, 1000);
    setInterval(updateTimer, 1000);
});
