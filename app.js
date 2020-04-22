const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#text-input");
const todoList = document.querySelector("#todo-list");
const removeButton = document.querySelector(".remove-icon");
const container = document.querySelector(".container");
const bottomRow = document.querySelector(".bottom-row");
const clearCompletedButton = document.querySelector("#clear-completed");
const selectAllButton = document.querySelector("#unchecked");

loadEventListeners();



function loadEventListeners() {
    form.addEventListener("submit", addTodo);
    form.addEventListener("click", selectAll);
    todoList.addEventListener("click", removeTodo);
    todoList.addEventListener("change", checkIfCompleted);
    bottomRow.addEventListener("click", removeAllCompleted);
    bottomRow.addEventListener("click", showAllActiveCompleted);
}

function checkIfCompleted() {
    const completed = document.querySelectorAll(".completed");
    const completedItems = document.querySelector("#item-left-count");
    let counter = 0;
    for(let i = 0; i < completed.length; i++) {
        if (completed[i].checked) {
            completed[i].parentElement.parentElement.childNodes[1].style.textDecoration = "line-through";
            completed[i].parentElement.parentElement.childNodes[1].style.color = "#D9D9D9";   
            completed[i].parentElement.lastChild.src = "icons/checkbox-checked.svg"     
            counter++
        } else {
            completed[i].parentElement.parentElement.childNodes[1].style.textDecoration = "none";
            completed[i].parentElement.parentElement.childNodes[1].style.color = "#4D4D4D";
            completed[i].parentElement.lastChild.src = "icons/checkbox-unchecked.svg" 
        }
    }
    if (counter > 0) {    
        clearCompletedButton.style.visibility = "visible";
    } else {
        clearCompletedButton.style.visibility = "hidden";
    }
    const itemsLeft = completed.length - counter;
    completedItems.innerText = itemsLeft;
}

function addTodo(e) {     
    if (todoInput.value.trim().length > 0) {
        todoList.style.display = "initial"
        const todo = document.createElement("li");
        todo.className = "list-item";
        const checkboxLabel = document.createElement("label");
        checkboxLabel.className = "list-item-checkbox"
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox";
        checkbox.className = "completed";
        checkboxLabel.appendChild(checkbox);
        const checkboxImg = document.createElement("img");
        checkboxImg.src = "icons/checkbox-unchecked.svg";
        checkboxImg.alt = "checkbox";
        checkboxLabel.appendChild(checkboxImg);
        todo.appendChild(checkboxLabel);
        const todoText = document.createElement("label");
        todoText.className = "list-item-text"
        todoText.innerText = todoInput.value;
        todo.appendChild(todoText);
        const removeButton = document.createElement("a");
        removeButton.href = "#";
        removeButton.innerHTML = '<img class="remove-icon" src="icons/cross.svg" alt="">';
        todo.appendChild(removeButton);
        todoList.appendChild(todo);
        todoInput.value = "";
        bottomRow.style.display = "flex";
        document.querySelector("#all-focus").focus();
        selectAllButton.style.visibility = "visible";
        checkIfCompleted();
        e.preventDefault();
    } else {
        e.preventDefault();
    }    
}

function removeTodo(e) {
    if(e.target.className == "remove-icon") {       
        e.target.parentElement.parentElement.remove();
        checkIfCompleted();
        checkListItems()
    }
}

function removeAllCompleted(e) {
    const completed = document.querySelectorAll(".completed");
    if(e.target.id == "clear-completed") {
        for(let i = 0; i < completed.length; i++) {
            if (completed[i].checked) {
                completed[i].parentElement.parentElement.remove();
            } 
        }
    }
    
    checkListItems()
    selectAllButton.id = "unchecked";
    clearCompletedButton.style.visibility = "hidden";
}

function checkListItems() {
    if (todoList.childElementCount == 0) {
        bottomRow.style.display = "none";
        selectAllButton.style.visibility = "hidden";
        todoList.style.display = "none"
    }
}

function selectAll(e) {
    const completed = document.querySelectorAll(".completed");
    if (e.target.id == "unchecked") {
        clearCompletedButton.style.visibility = "visible";
        e.target.id = "checked";
        for(let i = 0; i < completed.length; i++) {
            completed[i].checked = 1;
            completed[i].parentElement.lastChild.src = "icons/checkbox-checked.svg";
        }
        checkIfCompleted()
    } else if (e.target.id == "checked"){
        clearCompletedButton.style.visibility = "hidden";
        e.target.id = "unchecked";
        for(let i = 0; i < completed.length; i++) {
            completed[i].checked = 0;
            completed[i].parentElement.lastChild.src = "icons/checkbox-unchecked.svg";
        }
        checkIfCompleted()
    }
}

function showAllActiveCompleted(e) { 
    const completed = document.querySelectorAll(".completed");
    let count = 0;
    if (e.target.innerText == "Active") {
        for(let i = 0; i < completed.length; i++) {
            if (completed[i].checked) {
                completed[i].parentElement.parentElement.style.display = "none";
                count++
            } else {
                completed[i].parentElement.parentElement.style.display = "flex";
            }
        }
    }
    if (e.target.innerText == "Completed") {
        for(let i = 0; i < completed.length; i++) {
            if (completed[i].checked) {
                completed[i].parentElement.parentElement.style.display = "flex";
                count++
            } else {
                completed[i].parentElement.parentElement.style.display = "none";
            }
        }
    }
    if (e.target.innerText == "All") {
        for(let i = 0; i < completed.length; i++) {
            if (completed[i].checked) {
                completed[i].parentElement.parentElement.style.display = "flex";
                count++
            } else {
                completed[i].parentElement.parentElement.style.display = "flex";
            }
        }
    }
    if (count > 0) {
        clearCompletedButton.style.visibility = "visible";
    }
}
