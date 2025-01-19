const todoObject = [];
const todoListContainer = document.querySelector('.js-todo-container');
const todoDueDate = document.querySelector('.js-due-date');

const renderDom = () => {
  let todoListHTML = '';

  for (let t = 0; t < todoObject.length; t++) {
    const todo = todoObject[t];
    const html = `
    <p>
        ${todo.name} 
        ${todo.date} 
        <button class="delete" onclick="removeTodo(${t})">Delete</button></p>
    `;
    todoListHTML += html;
  }

  todoListContainer.innerHTML = todoListHTML;
};

const addTodo = () => {
  const todoInputElement = document.querySelector('.js-todo-input');
  const name = todoInputElement.value;

  todoObject.push({
    name: name,
    date: todoDueDate.value,
  });

  todoInputElement.value = '';
  todoDueDate.value = '';

  renderDom();
};

const removeTodo = (index) => {
  todoList.splice(index, 1);
  renderDom();
};
