"use strict";
const inputElement = document.querySelector(".input");
const buttonElement = document.querySelector(".button");
const ulElement = document.querySelector(".containerTodo");
const clearButton = document.querySelector(".clearButton");
let todolist = JSON.parse(localStorage.getItem("todolist") || "[]");
buttonElement.onclick = function createTodo(e) {
    e.preventDefault();
    const newTodo = {
        id: crypto.randomUUID(),
        title: inputElement.value,
    };
    todolist.push(newTodo);
    localStorage.setItem("todolist", JSON.stringify(todolist));
    addTodo(newTodo);
    inputElement.value = "";
    inputElement.focus();
};
function addTodo(todo) {
    ulElement.insertAdjacentHTML("beforeend", `<li>${todo.title} <button onclick="removeTodo('${todo.id}')">remove</button></li>`);
}
function removeTodo(todoID) {
    todolist = todolist.filter((item) => item.id !== todoID);
    localStorage.setItem("todolist", JSON.stringify(todolist));
    ulElement.innerHTML = "";
    todolist.map((item) => addTodo(item));
}
clearButton.onclick = function clearAll(e) {
    e.preventDefault();
    todolist = [];
    localStorage.setItem("todolist", JSON.stringify(todolist));
    ulElement.innerHTML = "";
};
window.addEventListener("DOMContentLoaded", () => todolist.map((item) => addTodo(item)));
