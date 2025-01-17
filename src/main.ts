import supabase from "./supabase";

async function getInfo(supabase: any) {
  let { data: todo, error } = await supabase.from("todo").select("*");
  if (error) {
    console.error("Fel vid hämtning:", error.message);
  } else {
    console.log("todo:", todo);
    todo.forEach((item: Todo) => {
      createTodo(item);
      console.log(item.id);
    });
  }
}

async function giveInfo(todo: Todo) {
  let { data: response, error } = await supabase
    .from("todo")
    .insert([{ description: todo.description, status: todo.status }])
    .select();
  if (error) {
    console.error("Fel vid hämtning:", error.message);
  } else {
    response.forEach((item: Todo) => {
      createTodo(item);
    });
  }
}

async function deleteInfo(todo: Todo) {
  const response = await supabase.from("todo").delete().eq("id", todo.id);
  console.log("response", response);
}

async function deleteAllInfo() {
  const response = await supabase.from("todo").delete().neq("id", 0);
  console.log("response", response);
}

async function updateInfo(todo: Todo) {
  const response = await supabase.from("todo").update({ description: todo.description }).eq("id", todo.id).select();
  console.log("response", response);
}

getInfo(supabase);

const todoSection = document.querySelector(".todo-section") as HTMLElement;
const input = document.querySelector(".desc-input") as HTMLInputElement;
const saveBtn = document.querySelector(".btn-save") as HTMLButtonElement;
const clearBtn = document.querySelector(".btn-clear") as HTMLButtonElement;

interface Todo {
  id?: number;
  description: string;
  status: boolean;
}

saveBtn.addEventListener("click", () => {
  const todo: Todo = {
    description: input.value,
    status: true,
  };
  giveInfo(todo);
});

function createTodo(todo: Todo) {
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
      updateInfo(todo);
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
    deleteInfo(todo);
  });
}

clearBtn.addEventListener("click", () => {
  todoSection.innerHTML = "";
  deleteAllInfo();
});
