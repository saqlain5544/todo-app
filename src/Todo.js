import React from "react";

const todoContext = React.createContext("todo");

export default function Todo() {
  const [todos, setTodos] = React.useState([]);

  return (
    <section className="flex flex-col gap-4 bg-gray-100 pt-4">
      <h1 className="text-4xl text-center">Things to Do</h1>
      <todoContext.Provider value={{ todos, setTodos }}>
        <TodoForm />
        <DisplayTodos />
        <TodoDetail />
      </todoContext.Provider>
    </section>
  );
}

function TodoForm(props) {
  const { todos, setTodos } = React.useContext(todoContext);
  const [error, setError] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const TodoFormData = new FormData(e.target);
    const todoText = TodoFormData.get("todo-item");
    const todoLength = Object.keys(todos).length || 0;
    if (todoText.length >= 5) {
      setTodos([...todos, { id: todoLength + 1, text: todoText }]);
      e.target.querySelector("input").value = "";
      error && setError("");
      return;
    }
    setError("A todo must be at least 5 characters long.");
  }

  return (
    <div className="pl-4 sm:px-8">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Add Todo"
          type="text"
          name="todo-item"
          className="border pl-3"
        />
        <button className="border ml-4 bg-blue-500 text-white px-3 rounded font-sm">
          Add Todo
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

function DisplayTodos() {
  const { todos, setTodos } = React.useContext(todoContext);

  function deleteTodo(currentId) {
    const newTodos = todos.filter((todo, id) => {
      return todo.id !== currentId;
    });
    console.log(newTodos);
    setTodos(newTodos);
  }

  return (
    todos && (
      <section className="flex flex-col gap-2">
        {todos.map((todo, idx) => (
          <article
            className="flex gap-1 bg-white-500 w-80 mx-auto gap-3"
            key={idx}
          >
            <input type="checkbox" />
            <p className="text-gray-800">{todo.text}</p>
            <button className="bg-red-400" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </article>
        ))}
      </section>
    )
  );
}

function TodoDetail() {
  const { todos } = React.useContext(todoContext);
  const len = Object.keys(todos).length;
  return (
    <section className="flex justify-between bg-blue-100 py-2 px-4">
      <article className="border-r pr-4 font-sm">
        <p className="text-gray-600">
          {len} item{len > 1 ? `s` : ""} in todo list.
        </p>
      </article>
      <Filters />
    </section>
  );
}

function Filters() {
  const { todos } = React.useContext(todoContext);

  return (
    todos.length > 0 && (
      <article className="flex justify-between">
        <div>
          <button className>All</button>
        </div>
        <div>
          <button>Active</button>
        </div>
        <div>
          <button>Completed</button>
        </div>
      </article>
    )
  );
}
