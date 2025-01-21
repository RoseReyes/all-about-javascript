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
    itemToDelete = index;
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="js-delete-todo delete-todo-button">Delete</button>
      `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  document
    .querySelectorAll('.js-delete-todo')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        removeTodo(index);
      });
    });
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

document.querySelector('.js-add-todo').addEventListener('click', () => {
  addTodo();
});

const multiplyNums = (num1, num2) => num1 * num2;
console.log(multiplyNums(2, 3));

const addNum = (array, num) => array.map((value) => value + num);
console.log(addNum([-2, -1, 0, 99], 2));

const removeEgg = (array) => {
  let eggsCount = 0;

  return array.filter((value, index) => {
    if (value === 'egg' && eggsCount < 2) {
      eggsCount++;
      return false;
    }

    return true;
  });
};

console.log(removeEgg(['egg', 'apple', 'egg', 'egg', 'ham']));
