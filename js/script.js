"use strict"

const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItems = document.querySelector('.todo-items');

// массив для тудушек
let todos = [];

//собираем данные из формы
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo(todoInput.value);
    //console.log(todoInput.value)
});

//добавление тудушки
function addTodo(item) {
    if (item !== '') {
        // шаблон объекта
        const todo = {
            id: Date.now(),
            name: item,
            completed: false,
            //title: 'some title',
            //description: 'some description'
        };

        //добавляем тудушку в хранилище
        todos.push(todo);

        //сохраняем в local storage
        addToLocalStorage(todos);

        //обнуляем поле ввода
        todoInput.value = "";
    }
    //console.log(todos)
}

function renderTodos(todos) {
    
    todoItems.innerHTML = '';

    todos.forEach((item) => {

        const checked = item.completed ? 'checked' : '';

        //создаем отдельный эл-т списка, куда будет всталять данные полученные из формы
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);

    
        if (item.completed === true) {
            li.classList.add('checked');
        }

        li.innerHTML = `            
            <input type="checkbox" class="checkbox" ${checked}>
            ${item.name}
            <button class="delete-button">X</button>
        `;

        todoItems.append(li);
        //console.log(item)
    });
}

//сохранение в local storage
function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    
    //выводим любые изменения
    renderTodos(todos);
}

//достаем из local storage
function getFromLocalStorage() {
    
    const savedData = localStorage.getItem('todos');

    if (savedData) {
        todos = JSON.parse(savedData);
        renderTodos(todos);
    }   
}


// проверка статуса выполнения
function changeStatus(id) {

    todos.forEach(item => {
        if (item.id == id) item.completed = !item.completed;
    });
    
    addToLocalStorage(todos);
}

// удаление тудушки
function deleteTodo(id) {

    todos = todos.filter(item => item.id != id);

    addToLocalStorage(todos);
}

getFromLocalStorage();

//слушаем события 
todoItems.addEventListener('click', (e) => {
    // слушаем чекбокс
    if (e.target.type === 'checkbox') {
        changeStatus(e.target.parentElement.getAttribute('data-key'));
    }

    // слушаем кнопку delete
    if (e.target.classList.contains('delete-button')) {
        deleteTodo(e.target.parentElement.getAttribute('data-key'));
    }
})