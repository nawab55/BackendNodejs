document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const amountInput = document.querySelector('#amount');
  const descriptionInput = document.querySelector('#description');
  const categoryInput = document.querySelector('#category');
  const userList = document.querySelector('#users');
  const addExpenseButton = document.querySelector('#btn');


  // Function to fetch and display expenses
  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/expenses');
      // const expenses = response.data.expenses;
      console.log(response);
        userList.innerHTML = ''; // Clear previous entries

      for(var i=0; i<response.data.expenses.length; i++){
        showUserOnScreen(response.data.expenses[i]);
      }

      // expenses.forEach((expense) => {
      //       showUserOnScreen(expense);
      // });
      
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // Function to add or update an expense
  const addOrUpdateExpense = async () => {
    const amnt = amountInput.value;
    const descrpn = descriptionInput.value;
    const ctgry = categoryInput.value;

    try {
      const editId = addExpenseButton.getAttribute('data-edit-id');

      if(editId){
        // If there's an existing expense ID, update the expense
        await axios.put(`http://localhost:3000/expenses/${editId}`, { amount: amnt, description: descrpn, category: ctgry });
      }else{
        // If there's no existing expense ID, add a new expense
        await axios.post('http://localhost:3000/expenses', { amount: amnt, description: descrpn, category: ctgry });
      }

      // const response = await axios.post('http://localhost:3000/expenses', { amount: amnt, description: descrpn, category: ctgry });
      // const result = response.data;
      // console.log(result);

      fetchExpenses(); // Fetch and display updated expenses
      resetForm(); // Reset the form after editing or adding
    } catch (error) {
      console.error('Error adding/updating expense:', error);
    }
  };

  // Function to delete an expense
  const deleteExpense = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/expenses/${id}`);
      const result = response.data;
      console.log(result);

      fetchExpenses(); // Fetch and display updated expenses
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  // Event listener for the "Add Expense" button
  document.getElementById('btn').addEventListener('click', () => {
    addOrUpdateExpense();
  });

  // Initial fetch and display of expenses
  fetchExpenses();

  // Function to display an expense on the screen
  const showUserOnScreen = (expense) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${expense.amount}: ${expense.description}: ${expense.category}`));

    // Create delete button
    const deleteButton = document.createElement('input');
    deleteButton.id = 'button';
    deleteButton.type = 'button';
    deleteButton.value = 'Delete Expense';
    deleteButton.class = "btn";
    // deleteButton.classList.add('btn');
    deleteButton.onclick = () => deleteExpense(expense.id);

    // Create edit button
    const editButton = document.createElement('input');
    editButton.id = 'editbtn'
    editButton.type = 'button';
    editButton.value = 'Edit Expense';
    editButton.class = "btn";
    // editButton.classList.add('btn');
    editButton.onclick = () => editExpense(expense);

    li.appendChild(deleteButton);
    li.appendChild(editButton);
    userList.appendChild(li);

    // Clear fields
    // amountInput.value = '';
    // descriptionInput.value = '';
    // categoryInput.value = '';

  };

  // Function to pre-fill form for editing an expense
  const editExpense = (expense) => {
    amountInput.value = expense.amount;
    descriptionInput.value = expense.description;
    categoryInput.value = expense.category;

    // Set a data attribute on the "Add Expense" button to store the ID
    addExpenseButton.setAttribute('data-edit-id', expense.id);
  };

  // Function to reset the form
  const resetForm = () => {
    amountInput.value = '';
    descriptionInput.value = '';
    categoryInput.value = '';
    addExpenseButton.removeAttribute('data-edit-id');
  };

});




