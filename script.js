// Select dom element
const input = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')


//Try to load save todo from local storage (if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];


function saveTodos() {
    // save current todo array to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

//create a dom node for a todo object and append it to the list
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    //  checkbox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", ()=>{
        todo.completed = checkbox.checked;

        //visual feedback: strick -through when completed
        textSpan.style.textDecoration =todo.completed? 'line-through':"";
        saveTodos();

    })
    //text of the todo 
    const textSpan = document.createElement("span");
    textSpan.textContent=todo.text;
    textSpan.style.margin = '0 8px' ;
    if(todo.completed){
        textSpan.style.textDecoration = 'line-through';
    }
      //add double-click event listener to edit todo
      textSpan.addEventListener("dbclick",()=>{
        const newText = prompt("Edit todo",todo.text);
        if(newText !== null){
            todo.text = newText.trim()
            textSpan.textContent= todo.text ;
            saveTodos();
        }
      })

      //DELETE TODO BUTTON
      const delBtn = document.createElement('button')
      delBtn.textContent = "Delete";
      delBtn.addEventListener('click',()=>{
           todos.splice(index,1);
           render();
           saveTodos(); 
      })

      li.appendChild(checkbox);
      li.appendChild(textSpan);
      li.appendChild(delBtn);
      return li
   

}

//render the whole todo list from todo array 
function render() {
    list.innerHTML = '';

    //recreate each item
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node)
    })

}

function addTodo(){
    const text = input.value.trim();
    if(!text){
        return
    }

    //push a new todo qbject
    todos.push({text,completed:false});
    input.value='';
    render()
    saveTodos()


}

addBtn.addEventListener("click",addTodo);
render();