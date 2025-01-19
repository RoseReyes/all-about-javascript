const todoList =
  JSON.parse(localStorage.getItem('todoList')).length > 0
    ? JSON.parse(localStorage.getItem('todoList'))
    : [
        { name: 'make dinner', dueDate: '2022-12-22' },
        { name: 'wash dishes', dueDate: '2022-12-22' },
      ];

const renderToDom = () => {
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

renderToDom();

const addTodo = () => {
  const todoInputElement = document.querySelector('.js-todo-input');
  const name = todoInputElement.value;

  const dateInputElement = document.querySelector('.js-due-date');
  const dueDate = dateInputElement.value;

  todoList.push({
    name,
    dueDate,
  });

  renderToDom();
  saveToStorage();

  todoInputElement.value = '';
  dateInputElement.value = '';
};

const removeTodo = (index) => {
  todoList.splice(index, 1);

  saveToStorage();
  renderToDom();
};

const saveToStorage = () => {
  localStorage.setItem('todoList', JSON.stringify(todoList));
};
