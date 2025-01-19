const todoList = [];

const renderDom = () => {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
    <div>${name}</div>
    <div>${dueDate}</div>
    <button class="delete-todo-button" onclick="removeTodo(${index})">Delete</button>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
};

const addTodo = () => {
  const todoInputElement = document.querySelector('.js-todo-input');
  const name = todoInputElement.value;

  const dateInputElement = document.querySelector('.js-due-date');
  const dueDate = dateInputElement.value;

  todoList.push({
    name,
    dueDate,
  });

  todoInputElement.value = '';
  dateInputElement.value = '';
  renderDom();
};

const removeTodo = (index) => {
  todoList.splice(index, 1);
  renderDom();
};
