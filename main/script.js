// Transaction data storage
const transactions = [];
let balance = 0;

// Select elements
const expenseBlock = document.getElementById('expense-block');
const incomeBlock = document.getElementById('income-block');
const submitBtn = document.getElementById('submit-btn');
const transactionList = document.getElementById('transaction-list');
const balanceDisplay = document.getElementById('balance');
const form = document.querySelector('form');

// Handle category selection
let transactionType = 'expense';

expenseBlock.addEventListener('click', () => selectType('expense'));
incomeBlock.addEventListener('click', () => selectType('income'));

function selectType(type) {
    transactionType = type;
    expenseBlock.classList.remove('selected');
    incomeBlock.classList.remove('selected');
    if (type === 'expense') {
        expenseBlock.classList.add('selected');
    } else {
        incomeBlock.classList.add('selected');
    }
}

// Handle transaction submission
submitBtn.addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    console.log(category)
    const transaction = {
        type: transactionType,
        amount,
        category,
        description,
        date: new Date().toLocaleDateString()
    };

    transactions.push(transaction);
    updateBalance(transaction);
    displayTransactions();
    saveToLocalStorage(); // Save updated transactions to local storage
    form.reset();
});


// Update balance
function updateBalance(transaction) {
    if (transaction.type === 'income') {
        balance += transaction.amount;
    } else {
        balance -= transaction.amount;
    }
    balanceDisplay.textContent = balance.toFixed(2);
}
// Display transactions
function displayTransactions() {
    transactionList.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        li.innerHTML = `
            ${transaction.date} - ${transaction.category}: ₹${transaction.amount} 
            <button onclick="deleteTransaction(${index})">Delete</button>
        `;
        transactionList.appendChild(li);
    });
}

// Delete transaction
function deleteTransaction(index) {
    const transaction = transactions[index];
    if (transaction.type === 'income') {
        balance -= transaction.amount;
    } else {
        balance += transaction.amount;
    }
    transactions.splice(index, 1);
    displayTransactions();
    balanceDisplay.textContent = balance.toFixed(2);
    saveToLocalStorage(); // Update local storage after deletion
}





// Define categories for income and expense
const incomeCategories = ['Salary', 'Interest', 'Freelance', 'Gifts'];
const expenseCategories = ['Food', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Investment'];

// Select the category dropdown
const categoryDropdown = document.getElementById('category');

// Update categories based on the transaction type
function updateCategoryOptions(type) {
    categoryDropdown.innerHTML = ''; // Clear existing options
    const categories = type === 'income' ? incomeCategories : expenseCategories;

    // Populate dropdown with the appropriate categories
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });
}

// Initial setup for default transaction type
updateCategoryOptions(transactionType);

// Update categories when transaction type changes
function selectType(type) {
    transactionType = type;
    expenseBlock.classList.remove('selected');
    incomeBlock.classList.remove('selected');
    if (type === 'expense') {
        expenseBlock.classList.add('selected');
    } else {
        incomeBlock.classList.add('selected');
    }

    updateCategoryOptions(type); // Update categories
}

// Handle category selection
expenseBlock.addEventListener('click', () => selectType('expense'));
incomeBlock.addEventListener('click', () => selectType('income'));




// transction to store on local storage

// Load transactions from local storage
window.onload = () => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(...storedTransactions);
    balance = calculateBalance(transactions);
    displayTransactions();
    balanceDisplay.textContent = balance.toFixed(2);
};

// Save transactions to local storage
function saveToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Update balance calculation
function calculateBalance(transactions) {
    return transactions.reduce((total, transaction) => {
        return transaction.type === 'income' ? total + transaction.amount : total - transaction.amount;
    }, 0);
}


// // for graph 

// function renderChart() {
//     const ctx = document.getElementById('transaction-chart').getContext('2d');
    
//     // Prepare data for the chart
//     const categories = transactions.reduce((acc, transaction) => {
//         if (!acc[transaction.category]) {
//             acc[transaction.category] = 0;
//         }
//         acc[transaction.category] += transaction.amount;
//         return acc;
//     }, {});

//     const data = {
//         labels: Object.keys(categories),
//         datasets: [{
//             label: 'Transaction Amounts',
//             data: Object.values(categories),
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)'
//             ],
//             borderWidth: 1
//         }]
//     };

//     // Create or update the chart
//     if (window.transactionChart) {
//         window.transactionChart.destroy(); // Destroy the previous chart instance
//     }
//     window.transactionChart = new Chart(ctx, {
//         type: 'bar', // Use 'pie', 'line', etc., for different chart types
//         data,
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: {
//                     display: true
//                 }
//             }
//         }
//     });
// }

// // Update chart after each transaction
// submitBtn.addEventListener('click', () => {
//     renderChart();
// });

// window.onload = () => {
//     const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
//     transactions.push(...storedTransactions);
//     balance = calculateBalance(transactions);
//     displayTransactions();
//     balanceDisplay.textContent = balance.toFixed(2);
//     renderChart(); // Render chart on page load
// };
