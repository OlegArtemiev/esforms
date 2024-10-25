function processData() {
    var inputText = document.getElementById("inputData").value;
    var lines = inputText.trim().split('\n');
    var data = [];
    var billingCycleDays = 30;
    var today = new Date('2024-10-25'); // Current date

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        // Skip empty lines and header
        if (line === '' || line.startsWith('user_account_id')) continue;
        var parts = line.split(/\s+/);
        if (parts.length < 2) continue;
        var userId = parts[0].trim();
        var creationDateStr = parts.slice(1).join(' ').trim();
        var creationDate = new Date(creationDateStr);
        if (isNaN(creationDate)) continue;

        // Calculate the next billing date
        var timeDifference = today - creationDate;
        var billingCycleMs = billingCycleDays * 24 * 60 * 60 * 1000;
        var cycles = Math.floor(timeDifference / billingCycleMs);
        var nextBillingDate = new Date(creationDate.getTime() + (cycles + 1) * billingCycleMs);

        // If the next billing date is in the past, add another cycle
        while (nextBillingDate <= today) {
            cycles++;
            nextBillingDate = new Date(creationDate.getTime() + (cycles + 1) * billingCycleMs);
        }

        data.push({userId: userId, nextBillingDate: nextBillingDate});
    }

    // Sort the data by the next billing date
    data.sort(function(a, b) {
        return a.nextBillingDate - b.nextBillingDate;
    });

    // Display the results
    var resultsDiv = document.getElementById("results");
    var outputHtml = '<table border="1" cellpadding="5" cellspacing="0"><tr><th>User Account ID</th><th>Next Billing Date</th></tr>';
    for (var i = 0; i < data.length; i++) {
        outputHtml += '<tr><td>' + data[i].userId + '</td><td>' + data[i].nextBillingDate.toLocaleString() + '</td></tr>';
    }
    outputHtml += '</table>';
    resultsDiv.innerHTML = outputHtml;
}
