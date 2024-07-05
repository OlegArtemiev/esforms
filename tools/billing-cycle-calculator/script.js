document.getElementById('billing-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const startDate = new Date(document.getElementById('start-date').value);
    const cycleCount = parseInt(document.getElementById('cycle-count').value);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    for (let i = 0; i < cycleCount; i++) {
        const billingDate = new Date(startDate);
        billingDate.setDate(billingDate.getDate() + (i * 30));
        const dateString = billingDate.toISOString().split('T')[0];
        resultsDiv.innerHTML += `<p>Billing Date ${i + 1}: ${dateString}</p>`;
    }
});