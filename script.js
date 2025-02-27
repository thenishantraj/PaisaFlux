let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransaction() {
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value.trim();
    const type = document.getElementById('type').value;

    if (!amount || !category) {
        alert('कृपया सभी फ़ील्ड भरें');
        return;
    }

    const transaction = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        amount,
        category,
        type
    };

    transactions.push(transaction);
    updateLocalStorage();
    updateUI();
    clearFields();
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    updateUI();
}

function clearFields() {
    document.getElementById('amount').value = '';
    document.getElementById('category').value = '';
}

function updateUI() {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
        const item = document.createElement('div');
        item.className = `transaction-item ${transaction.type.toLowerCase()}`;
        item.innerHTML = `
            <div>
                <span class="date">${transaction.date}</span>
                <span class="category">${transaction.category}</span>
            </div>
            <div>
                <span class="amount">₹${transaction.amount.toFixed(2)}</span>
                <button onclick="deleteTransaction(${transaction.id})" class="btn-delete">×</button>
            </div>
        `;
        transactionList.appendChild(item);

        if (transaction.type === 'Income') totalIncome += transaction.amount;
        else totalExpense += transaction.amount;
    });

    document.getElementById('totalIncome').textContent = `₹${totalIncome.toFixed(2)}`;
    document.getElementById('totalExpense').textContent = `₹${totalExpense.toFixed(2)}`;
    document.getElementById('balance').textContent = `₹${(totalIncome - totalExpense).toFixed(2)}`;
}

// Initial load
updateUI();