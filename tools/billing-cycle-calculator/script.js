document.getElementById('billing-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const startDateInput = document.getElementById('start-date').value;
    const startDateTimeInput = document.getElementById('start-date-time').value;

    let startDate;
    if (startDateTimeInput) {
        startDate = new Date(startDateTimeInput);
        if (isNaN(startDate)) {
            alert('Invalid date format in Start Date and Time. Please enter date in format YYYY-MM-DD HH:MM:SS.sss ±ZZZZ');
            return;
        }
    } else if (startDateInput) {
        startDate = new Date(startDateInput);
        if (isNaN(startDate)) {
            alert('Invalid date format in Start Date.');
            return;
        }
    } else {
        alert('Please enter a Start Date or Start Date and Time.');
        return;
    }

    const cycleCount = parseInt(document.getElementById('cycle-count').value);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const billingDates = [];
    for (let i = 0; i < cycleCount; i++) {
        const billingDate = new Date(startDate);
        billingDate.setDate(billingDate.getDate() + (i * 30));
        billingDates.push(billingDate);
        const dateString = formatDate(billingDate);
        resultsDiv.innerHTML += `<p>Billing Date ${i + 1}: ${dateString}</p>`;
    }

    // Поточна дата
    const currentDate = new Date();

    // Знаходимо найближчі попередню та наступну дати виставлення рахунку
    let previousDate = null;
    let nextDate = null;

    for (let i = 0; i < billingDates.length; i++) {
        if (billingDates[i] <= currentDate) {
            previousDate = billingDates[i];
        }
        if (billingDates[i] > currentDate && nextDate === null) {
            nextDate = billingDates[i];
        }
    }

    resultsDiv.innerHTML += `<h2>Current Date: ${formatDate(currentDate)}</h2>`;
    if (previousDate) {
        resultsDiv.innerHTML += `<p>Previous Billing Date: ${formatDate(previousDate)}</p>`;
    } else {
        resultsDiv.innerHTML += `<p>There is no previous billing date.</p>`;
    }
    if (nextDate) {
        resultsDiv.innerHTML += `<p>Next Billing Date: ${formatDate(nextDate)}</p>`;
    } else {
        resultsDiv.innerHTML += `<p>There is no next billing date.</p>`;
    }
});

function pad(n, width = 2) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const milliseconds = pad(date.getMilliseconds(), 3);
    const timezoneOffset = -date.getTimezoneOffset();
    const tzSign = timezoneOffset >= 0 ? '+' : '-';
    const tzHours = pad(Math.floor(Math.abs(timezoneOffset) / 60));
    const tzMinutes = pad(Math.abs(timezoneOffset) % 60);
    const tzString = tzSign + tzHours + tzMinutes;

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds} ${tzString}`;
}
