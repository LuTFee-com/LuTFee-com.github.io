document.addEventListener("DOMContentLoaded", () => {
    const balanceElement = document.getElementById("balance");
    const incomeElement = document.getElementById("income");
    const expenseElement = document.getElementById("expense");
    const transactionList = document.getElementById("transaction-list");
    const transactionForm = document.getElementById("transaction-form");
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    function updateUI() {
        let income = 0;
        let expense = 0;
        let balance = 0;

        transactionList.innerHTML = "";

        transactions.forEach(transaction => {
            const transactionItem = document.createElement("li");
            transactionItem.classList.add(transaction.amount > 0 ? "income" : "expense");
            transactionItem.innerHTML = `
                ${transaction.description} <span>${transaction.amount > 0 ? "+" : ""}฿${transaction.amount.toFixed(2)}</span>
                <button onclick="removeTransaction(${transaction.id})">x</button>
            `;
            transactionList.appendChild(transactionItem);

            if (transaction.amount > 0) {
                income += transaction.amount;
            } else {
                expense += Math.abs(transaction.amount);
            }
            balance = income - expense;
        });

        balanceElement.textContent = `฿${balance.toFixed(2)}`;
        incomeElement.textContent = `฿${income.toFixed(2)}`;
        expenseElement.textContent = `฿${expense.toFixed(2)}`;

        localStorage.setItem("transactions", JSON.stringify(transactions));
    }

    function addTransaction(event) {
        event.preventDefault();

        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value);

        if (description === "" || isNaN(amount)) {
            alert("Please enter valid description and amount");
            return;
        }

        const newTransaction = {
            id: Date.now(),
            description,
            amount
        };

        transactions.push(newTransaction);
        updateUI();

        descriptionInput.value = "";
        amountInput.value = "";
    }

    window.removeTransaction = (id) => {
        transactions = transactions.filter(transaction => transaction.id !== id);
        updateUI();
    };

    transactionForm.addEventListener("submit", addTransaction);
    updateUI();
});
