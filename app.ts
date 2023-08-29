const inputElement = document.querySelector(".input") as HTMLInputElement;
const buttonElement = document.querySelector(".addTodo") as HTMLButtonElement;
const divElement = document.querySelector(".container") as HTMLDivElement;
const clearButton = document.querySelector(".remove") as HTMLButtonElement;

interface Todo {
  id: string;
  title: string;
}
let todolist: Todo[] = JSON.parse(localStorage.getItem("todolist") || "[]");
buttonElement.onclick = function createTodo(e: Event) {
  e.preventDefault();
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title: inputElement.value,
  };
  todolist.push(newTodo);
  localStorage.setItem("todolist", JSON.stringify(todolist));
  addTodo(newTodo);

  inputElement.value = "";
  inputElement.focus();
};

function addTodo(todo: Todo) {
  divElement.insertAdjacentHTML(
    "beforeend",
    `<div class="todo">
    ${todo.title} 
    <div class="buttons">
    <button class="remove button" onclick="removeTodo('${todo.id}')">Delete</button>
    </div>
    </div>`
  );
}

function removeTodo(todoID: string) {
  todolist = todolist.filter((item) => item.id !== todoID);
  localStorage.setItem("todolist", JSON.stringify(todolist));
  divElement.innerHTML = "";
  todolist.map((item) => addTodo(item));
}

clearButton.onclick = function clearAll(e: Event) {
  e.preventDefault();
  todolist = [];
  localStorage.setItem("todolist", JSON.stringify(todolist));
  divElement.innerHTML = "";
};

window.addEventListener("DOMContentLoaded", () =>
  todolist.map((item) => addTodo(item))
);

// second method

// const inputElement = document.querySelector('.input') as HTMLInputElement;
// const buttonAddTodo = document.querySelector('.buttonAddTodo') as HTMLButtonElement;
// const container = document.querySelector('.container') as HTMLUListElement;
// const buttonClearAll = document.querySelector('.buttonClearAll') as HTMLButtonElement;

// interface Todo {
//     id:string;
//     title:string;
// }

// let todos:Todo[]= JSON.parse(localStorage.getItem('todolist') || "[]");

// function createTodo() {

//     const todo:Todo = {
//         id:crypto.randomUUID(),
//         title:inputElement.value
//     }
//     return todo
// }

// buttonAddTodo.onclick = function addTodo(e:Event) {
//     e.preventDefault();
//     const newTodo = createTodo();
//     todos.push(newTodo);
//     localStorage.setItem('todolist', JSON.stringify(todos))
//     container.insertAdjacentHTML('beforeend', `<li>${newTodo.title} <button onclick='removeTodo("${newTodo.id}")'>remove todo</button></li>`);
//     inputElement.value = '';
//     inputElement.focus()
// }

// function removeTodo(todoID:string) {
//     todos = todos.filter(item => item.id !== todoID);
//     localStorage.setItem('todolist', JSON.stringify(todos))
//     container.innerHTML = ''
//     todos.map(item =>   container.insertAdjacentHTML('beforeend', `<li>${item.title} <button onclick='removeTodo("${item.id}")'>remove todo</button></li>`))
// }

// buttonClearAll.onclick = function clearAll(e:Event){
//     e.preventDefault();
//     todos = [];
//     localStorage.setItem('todolist', JSON.stringify(todos));
//     container.innerHTML = ''
// }

// window.addEventListener('DOMContentLoaded', () => todos.map(item =>   container.insertAdjacentHTML('beforeend', `<li>${item.title} <button onclick='removeTodo("${item.id}")'>remove todo</button></li>`)))
