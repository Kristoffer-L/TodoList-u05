import supabase from './supabase.ts';

async function getInfo(supabase : any) {

  let { Table, error } = await supabase
  .from('Table')
  .select('*');
          
    if (error) {
      console.error('Fel vid hämtning:', error.message);
  } else {
      console.log('Användare:', Table);
  }
}

getInfo(supabase)


const todoSection = document.querySelector(".todo-section") as HTMLElement
const input = document.querySelector(".desc-input") as HTMLInputElement
const saveBtn = document.querySelector(".btn-save") as HTMLButtonElement
const clearBtn = document.querySelector(".btn-clear") as HTMLButtonElement
let count = 0
let localStorageInfo: Array<Todo> = []

interface Todo {
    id: number;
    description: string;
    status: boolean;
}

// const smtharray: Array<Todo> = JSON.parse(localStorage.localStorageInfo)
// smtharray.forEach((item) => {
//     count++
//     item.id = count;
//     createTodo(item)
// })

saveBtn.addEventListener("click", () => {
    const todo: Todo  = {
        id: count,
        description: input.value,
        status: true
    }
    count++
    createTodo(todo)

})


function createTodo(todo: Todo) {
    localStorageInfo.push(todo)
    localStorage.setItem("localStorageInfo", JSON.stringify(localStorageInfo))
    const divs = document.createElement("div")
    todoSection.appendChild(divs)
    divs.classList.add("todo-element")

    const description = document.createElement("p")
    divs.appendChild(description)
    description.classList.add("description")
    description.textContent = todo.description;
    description.addEventListener("click", () => {
        if(todo.status) {
            description.style.textDecoration = "line-through"
            todo.status = false
        } else {
            description.style.textDecoration = "none"
            todo.status = true
        }
    })
    const edit = document.createElement("button")
    divs.appendChild(edit)
    edit.textContent = "redigera"
    edit.addEventListener("click", () => {
        remove.style.display = "none"
        edit.style.display = "none"
        const editInput = document.createElement("input")
        divs.appendChild(editInput)
        const editSave = document.createElement("button")
        divs.appendChild(editSave)
        editSave.textContent = "save"
        editSave.addEventListener("click", () => {
            description.textContent = editInput.value;
            todo.description = editInput.value
            localStorage.setItem("localStorageInfo", JSON.stringify(localStorageInfo))
            remove.style.display = "none"
            edit.style.display = "none"
            editInput.remove()
            editSave.remove()
        })
    })


    const remove = document.createElement("p")
    divs.appendChild(remove)
    remove.textContent = "X"
    remove.classList.add("remove")
    remove.addEventListener("click", () => {
            divs.remove()
        })
}

clearBtn.addEventListener("click", () => {
    todoSection.innerHTML = ""
    localStorage.clear()
})
