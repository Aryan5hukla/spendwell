// Remove the declaration of transactions
// const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

console.log("Loaded transactions:", transactions);

function filterTransactions(type) {
    return transactions.filter(transaction => transaction.type === type);
}

function calculateCategoryTotals(filteredTransactions) {
    return filteredTransactions.reduce((totals, transaction) => {
        if (!totals[transaction.category]) {
            totals[transaction.category] = 0;
        }
        totals[transaction.category] += transaction.amount;
        return totals;
    }, {});
}

function renderPieCharts() {
    const incomeTransactions = filterTransactions('income');
    const expenseTransactions = filterTransactions('expense');

    const incomeTotals = calculateCategoryTotals(incomeTransactions);
    const expenseTotals = calculateCategoryTotals(expenseTransactions);

    // Render income chart
    const incomeCtx = document.getElementById('income-chart').getContext('2d');
    new Chart(incomeCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(incomeTotals),
            datasets: [{
                data: Object.values(incomeTotals),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });

    // Render expense chart
    const expenseCtx = document.getElementById('expense-chart').getContext('2d');
    new Chart(expenseCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(expenseTotals),
            datasets: [{
                data: Object.values(expenseTotals),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
}

function renderChart() {
    const ctx = document.getElementById('transaction-chart').getContext('2d');
    
    // Prepare data for the bar chart
    const categories = transactions.reduce((acc, transaction) => {
        if (!acc[transaction.category]) {
            acc[transaction.category] = 0;
        }
        acc[transaction.category] += transaction.amount;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(categories),
        datasets: [{
            label: 'Transaction Amounts',
            data: Object.values(categories),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Create or update the chart
    if (window.transactionChart) {
        window.transactionChart.destroy(); // Destroy the previous chart instance
    }
    window.transactionChart = new Chart(ctx, {
        type: 'bar', // Use 'pie', 'line', etc., for different chart types
        data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}
