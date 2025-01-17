const todoList = [];

const addTodo = () => {
  const inputElement = document.querySelector('.js-todo-input');
  const dateElement = document.querySelector('.js-date-input');
  const listElement = document.querySelector('.js-todo-list');
  const todo = inputElement.value;

  todoList.push(todo);
  inputElement.value = '';

  const paragraphElement = document.createElement('p');
  paragraphElement.appendChild(document.createTextNode(todo));
  listElement.appendChild(paragraphElement);
};
