import supabase from "./supabase";

async function getInfo(supabase: any) {
  let { data: todo, error } = await supabase.from("todo").select("*");
  console.log(supabase);
  if (error) {
    console.error("Fel vid hämtning:", error.message);
  } else {
    console.log("todo:", todo);
    todo.forEach((item) => {
      count++;
      item.id = count;
      createTodo(item);
    });
  }
}

async function giveInfo(todoItem) {
  const response = await supabase
    .from("todo")
    .insert([{ id: todoItem.id, description: todoItem.description, status: todoItem.status }])
    .select();
  console.log("response", response);
}

getInfo(supabase);

const todoSection = document.querySelector(".todo-section") as HTMLElement;
const input = document.querySelector(".desc-input") as HTMLInputElement;
const saveBtn = document.querySelector(".btn-save") as HTMLButtonElement;
const clearBtn = document.querySelector(".btn-clear") as HTMLButtonElement;
let count = 0;
let localStorageInfo: Array<Todo> = [];

interface Todo {
  id: number;
  description: string;
  status: boolean;
}

saveBtn.addEventListener("click", () => {
  const todo: Todo = {
    id: count,
    description: input.value,
    status: true,
  };
  count++;
  giveInfo(todo);
  createTodo(todo);
});

function createTodo(todo: Todo) {
  localStorageInfo.push(todo);
  localStorage.setItem("localStorageInfo", JSON.stringify(localStorageInfo));
  const divs = document.createElement("div");
  todoSection.appendChild(divs);
  divs.classList.add("todo-element");

  const description = document.createElement("p");
  divs.appendChild(description);
  description.classList.add("description");
  description.textContent = todo.description;
  description.addEventListener("click", () => {
    if (todo.status) {
      description.style.textDecoration = "line-through";
      todo.status = false;
    } else {
      description.style.textDecoration = "none";
      todo.status = true;
    }
  });
  const edit = document.createElement("button");
  divs.appendChild(edit);
  edit.textContent = "redigera";
  edit.addEventListener("click", () => {
    remove.style.display = "none";
    edit.style.display = "none";
    const editInput = document.createElement("input");
    divs.appendChild(editInput);
    const editSave = document.createElement("button");
    divs.appendChild(editSave);
    editSave.textContent = "save";
    editSave.addEventListener("click", () => {
      description.textContent = editInput.value;
      todo.description = editInput.value;
      localStorage.setItem("localStorageInfo", JSON.stringify(localStorageInfo));
      remove.style.display = "block";
      edit.style.display = "block";
      editInput.remove();
      editSave.remove();
    });
  });

  const remove = document.createElement("p");
  divs.appendChild(remove);
  remove.textContent = "X";
  remove.classList.add("remove");
  remove.addEventListener("click", () => {
    divs.remove();
  });
}

clearBtn.addEventListener("click", () => {
  todoSection.innerHTML = "";
  localStorage.clear();
});
