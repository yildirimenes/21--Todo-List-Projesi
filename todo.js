// Tüm Elementleri Seçme

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() { // Tüm EVent Listenerlar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){
    if(confirm("Tümünü silmek istediğinizden emin misiniz ?")) {
       
        // Arayüzden todoları temizle
        // todoList.innerHTML = ""; // yavaş

        while(todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
    }
    localStorage.removeItem("todos");
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const ListItems = document.querySelectorAll(".list-group-item");

    ListItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        
        if(text.indexOf(filterValue) === -1){  // Bulunamadı
            
            listItem.setAttribute("style","display : none !important");
        }
        else{
            
            listItem.setAttribute("style","display : block");
        }
    
    })};

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi...");
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);  // Arrayden değeri silebiliriz.
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));

}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoUI(todo);
    })
}

function addTodo(e){
    const newTodo = todoInput.value.trim();

    if(newTodo === "") {
        
        showAlert("danger","Lütfen bir todo girin...");

    }
    else{
        addTodoUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo başarıyla eklendi");
    }

    e.preventDefault();
}

function getTodosFromStorage(){ // Storagedan Todoları Alma

    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}

function addTodoToStorage(newTodo){

    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));

}

function showAlert(type,message){

    const alert = document.createElement("div");
    
    alert.className = `alert alert-${type}`;
    
    alert.textContent = message;

    firstCardBody.appendChild(alert);
    
    // Set Timeout (alert yazısı gösterme süresi)

    setTimeout(function(){
        alert.remove();
    },1500);


}


function addTodoUI(newTodo){ 

   // List Item Oluşturma

   const listItem = document.createElement("li");
   listItem.className = "list-group-item d-flex justify-content-between";

   // Link OLuşturma
   const link = document.createElement("a");
   link.href = "#";
   link.className = "delete-item";
   link.innerHTML = "<i class = 'fa fa-remove'></i>";

    // Text Node Ekleme

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Todo List'e List Item'ı Ekleme

    todoList.appendChild(listItem);
    todoInput.value = "";
}

   
