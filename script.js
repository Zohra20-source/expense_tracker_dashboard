const form = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");

const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const balance = document.getElementById("balance");

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactions(){
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function updateSummary(){

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {

        if(transaction.type === "income"){
            income += transaction.amount;
        }else{
            expense += transaction.amount;
        }

    });

    totalIncome.textContent = `₹${income}`;
    totalExpense.textContent = `₹${expense}`;
    balance.textContent = `₹${income - expense}`;
}

function displayTransactions(){

    transactionList.innerHTML = "";

    transactions.forEach((transaction,index)=>{

        const li = document.createElement("li");

        li.classList.add("transaction");

        li.innerHTML = `

            <div class="transaction-info">
                <strong>${transaction.description}</strong>
                <small>${transaction.category}</small>
            </div>

            <div class="${
                transaction.type === "income"
                ? "transaction-income"
                : "transaction-expense"
            }">

                ${
                    transaction.type === "income"
                    ? "+"
                    : "-"
                }

                ₹${transaction.amount}

            </div>

            <button
                class="delete-btn"
                onclick="deleteTransaction(${index})"
            >
                Delete
            </button>

        `;

        transactionList.appendChild(li);

    });

}

function deleteTransaction(index){

    transactions.splice(index,1);

    saveTransactions();
    displayTransactions();
    updateSummary();

}

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const description =
    document.getElementById("description").value;

    const amount =
    Number(document.getElementById("amount").value);

    const type =
    document.getElementById("type").value;

    const category =
    document.getElementById("category").value;

    transactions.push({

        description,
        amount,
        type,
        category

    });

    saveTransactions();
    displayTransactions();
    updateSummary();

    form.reset();

});

displayTransactions();
updateSummary();