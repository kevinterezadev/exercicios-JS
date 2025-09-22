let balance = 0

async function deleteTransaction(transactionId) {
    document.getElementById(transactionId).remove()
    const response = await fetch(`http://localhost:3000/transactions/${transactionId}`, {
        method: "DELETE"
    })
}

let action = "salvar"
let editingId = null

async function editTransaction(transactionId, newTransaction) {
    const response = await fetch(`http://localhost:3000/transactions/${transactionId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTransaction)
    })
    return await response.json()
}

function renderTransaction(transaction) {
    const transactionDiv = document.createElement("div")
    transactionDiv.classList.add("history__item")
    transactionDiv.id = transaction.id

    const transactionInfo = document.createElement("div")
    transactionInfo.classList.add("history__info")
    const transactionName = document.createElement("p")
    transactionName.textContent = transaction.name
    transactionName.classList.add("history__name")
    const transactionAmount = document.createElement("p")
    transactionAmount.classList.add("history__amount")
    if (Number(transaction.amount) < 0) {
        transactionAmount.classList.add("history__amount", "history__amount--negative") 
    } else {
        transactionAmount.classList.add("history__amount", "history__amount--positive")
    }
    transactionAmount.textContent = `R$ ${Number(transaction.amount)}`

    const transactionDeleteBtn = document.createElement("button")
    transactionDeleteBtn.textContent = "Deletar"
    transactionDeleteBtn.classList.add("history__option", "history__option--delete")
    transactionDeleteBtn.addEventListener("click", () => {
        balance -= Number(transaction.amount)
        updateBalance()
        deleteTransaction(transaction.id)
    })

    const transactionEditBtn = document.createElement("button")
    transactionEditBtn.textContent = "Editar"
    transactionEditBtn.classList.add("history__option", "history__option--edit")
    transactionEditBtn.addEventListener("click", () => {
        document.getElementById("transaction-legend").textContent = "Editar Transação"
        document.getElementById("transaction-legend").classList.add("transaction__legend--edit")

        document.getElementById("form-name").value = transaction.name
        document.getElementById("form-value").value = transaction.amount

        editingId = transaction.id
        action = "atualizar"
    })

    transactionInfo.append(transactionName, transactionAmount)
    transactionDiv.append(transactionInfo, transactionDeleteBtn, transactionEditBtn)
    document.getElementById("history-section").appendChild(transactionDiv)
    balance += Number(transaction.amount)
    updateBalance()
}

function updateBalance() {
    document.getElementById("balance").textContent = `R$ ${balance.toFixed(2)}`
    if (balance < 0) {
        document.getElementById("balance").classList.add("dashboard__balance--negative")
        document.getElementById("balance").classList.remove("dashboard__balance--positive")
    } else {
        document.getElementById("balance").classList.add("dashboard__balance--positive")
        document.getElementById("balance").classList.remove("dashboard__balance--negative")
    }
}

document.getElementById("save-btn").addEventListener("click", () => action = "salvar")
document.getElementById("edit-btn").addEventListener("click", () => action = "atualizar")

document.getElementById("form").addEventListener("submit", async (ev) => {
    ev.preventDefault()

    const newTransaction = {
        name: document.getElementById("form-name").value,
        amount: Number(document.getElementById("form-value").value)
    }

    if (action === "salvar") {
        const response = await fetch("http://localhost:3000/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTransaction)
        })

        const savedResponse = await response.json()
        renderTransaction(savedResponse)
        document.getElementById("form").reset()
    }

    if (action === "atualizar" && editingId) {
        // antes de atualizar, tira o valor antigo do saldo
        const oldAmount = Number(document.getElementById(editingId).querySelector(".history__amount").textContent.replace("R$",""))
        balance -= oldAmount

        const updatedResponse = await editTransaction(editingId, newTransaction)

        document.getElementById(editingId).remove()
        renderTransaction(updatedResponse)

        document.getElementById("form").reset()
        editingId = null
        action = "salvar"
        document.getElementById("transaction-legend").textContent = "Nova Transação"
        document.getElementById("transaction-legend").classList.remove("transaction__legend--edit")
    }
})

async function getTransactions() {
    const response = await fetch("http://localhost:3000/transactions")
    const transaction = await response.json()

    transaction.forEach(renderTransaction)
}

getTransactions()