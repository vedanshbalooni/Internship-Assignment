async function addExpense() {
    var descriptionInput = document.getElementById("descriptionInput");
    var categoryInput = document.getElementById("categoryInput");
    var amountInput = document.getElementById("amountInput");
    var expenseList = document.getElementById("expenseList");

    if (descriptionInput.value.trim() !== "" && categoryInput.value.trim() !== "" && amountInput.value.trim() !== "") {
        var response = await fetch('/add_expense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `description=${encodeURIComponent(descriptionInput.value)}&category=${encodeURIComponent(categoryInput.value)}&amount=${encodeURIComponent(amountInput.value)}`,
        });

        if (response.ok) {
            var listItem = document.createElement("li");
            var data = await response.json();
            listItem.textContent = `${data.description} - ${data.amount} - ${data.category} - ${data.date}`;
            expenseList.appendChild(listItem);
            descriptionInput.value = "";
            categoryInput.value = "";
            amountInput.value = "";
        }
    }

    return false;
}
