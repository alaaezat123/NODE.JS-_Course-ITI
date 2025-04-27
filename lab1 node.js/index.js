const fs = require("fs"); 
const TODO_FILE = "./todo.json";
const [,, command, ...args] = process.argv;

function readTodos() {
  try {
    const data = fs.readFileSync(TODO_FILE, { encoding: 'utf8' });
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveTodos(todos) {
  fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 3));
}

function displayTodos(todos) {
  if (todos.length === 0) {
    console.log("No tasks found");
    return;
  }

  todos.forEach(todo => {
    
    console.log(`[${todo.id}] ${todo.title} (Status: ${todo.status || 'to-do'})`);//
  });
}

/////////////////////////////////
if (command === "create") {
  const title = args.join(" ");
  if (!title) {
    console.log("Error: Please enter a task title");
    process.exit(1);
  }

  const todos = readTodos();
  const newId = todos.length > 0 ? Math.max(...todos.map(item => item.id)) + 1 : 1;
  

  todos.push({ 
    id: newId, 
    title: title,
    status: 'to-do' ///bouns
  });
  
  saveTodos(todos);
  console.log(`Added task`);
}
///////////////////
else if (command === "list") {
  const todos = readTodos();
  displayTodos(todos); 
}

///////////////////////
else if (command === "edit") {
  const [id, ...newTitleParts] = args;
  const newTitle = newTitleParts.join(" ");

  if (!id || !newTitle) {
    console.log("Error: Please enter task ID and new title");
    process.exit(1);
  }

  const todos = readTodos();
  const todoIndex = todos.findIndex(item => item.id === parseInt(id));

  if (todoIndex === -1) {
    console.log("not found");
  } else {
    const oldTitle = todos[todoIndex].title;
    todos[todoIndex].title = newTitle;
    saveTodos(todos);
    console.log("Updated task");
  }
}

/////////////////////////
else if (command === "delete") {
  const [id] = args;

  if (!id) {
    console.log("Error: Please enter task ID to delete");
    process.exit(1);
  }

  const todos = readTodos();
  const todoIndex = todos.findIndex(item => item.id === parseInt(id));

  if (todoIndex === -1) {
    console.log("not found");
  } else {
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    saveTodos(todos);
    console.log("Deleted task");
  }
}