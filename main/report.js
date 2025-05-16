// Declare transactions globally, so it can be accessed in both files
let transactions = [];
let balance = 0;

// Select the necessary elements from the report page
const transactionList = document.getElementById('transaction-list');
const balanceDisplay = document.getElementById('balance');

// Load transactions from local storage
window.onload = () => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions = storedTransactions; // Populate the global transactions array
    balance = calculateBalance(transactions); // Calculate the total balance from transactions
    displayTransactions(); // Display the transactions on the page
    balanceDisplay.textContent = balance.toFixed(2); // Show the total balance

    // Render charts after data is loaded
    renderPieCharts(); // Render pie charts for income and expenses
    renderChart(); // Render the bar chart for transactions
};

// Function to display transactions
function displayTransactions() {
    transactionList.innerHTML = ''; // Clear existing transactions
    transactions.forEach((transaction) => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        li.innerHTML = `${transaction.date} - ${transaction.category}: ₹${transaction.amount}`;
        transactionList.appendChild(li);
    });
}

// Calculate balance from the transactions
function calculateBalance(transactions) {
    return transactions.reduce((total, transaction) => {
        return transaction.type === 'income' ? total + transaction.amount : total - transaction.amount;
    }, 0);
}
