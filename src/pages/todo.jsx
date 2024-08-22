import { useEffect, useRef, useState } from "react";
import './todo.css';
const getLocalData = () => {
  const tasksData = localStorage.getItem("tasks");
  if (tasksData) {
    return JSON.parse(tasksData);
  } else {
    return [];
  }
};

export const Todo = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState(getLocalData());
  const [editedTask, setEditedTask] = useState(null);
  const [toggleBtn, setToggleBtn] = useState(false);
  const inputRef = useRef(null);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const addItems = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      return;
    } else if (toggleBtn && editedTask) {
      setTasks(
        tasks.map((curElem) => {
          if (curElem.id === editedTask) {
            return { id: curElem.id, task: input };
          }
          return curElem;
        })
      );
      setToggleBtn(false);
      setEditedTask(null);
    } else {
      const isAdd = tasks.some((curElem) => curElem.task === input);
      if (!isAdd) {
        const newTask = { id: new Date().getTime(), task: input };
        setTasks([...tasks, newTask]);
      }
    }
    setInput("");
  };

  const deleteItem = (id) => {
    const updatedTasks = tasks.filter((curElem) => curElem.id !== id);
    setTasks(updatedTasks);
  };

  const editItem = (id) => {
    const editTask = tasks.find((curElem) => curElem.id === id);
    if (editTask) {
      setInput(editTask.task);
      setEditedTask(id);
      setToggleBtn(true);
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="container2">
      <div className="small-container2">
        <h1>Todo List</h1>
        <form onSubmit={addItems}>
          <input
            type="text"
            placeholder=" ✍️ Add a todo..."
            value={input}
            onChange={handleInput}
            required
            ref={inputRef}
          />
          <button type="submit" className="add">
            {toggleBtn ? (
              <i
                className="bx bxs-edit-alt edit"
                style={{ fontSize: "1.2rem" }}
              ></i>
            ) : (
              <i className="bx bx-plus plus"></i>
            )}
          </button>
        </form>
        <ul>
          {tasks.map((curElem) => (
            <div key={curElem.id} className="item">
              <li className="task">{curElem.task}</li>
              <i
                className="bx bxs-edit-alt edit"
                onClick={() => editItem(curElem.id)}
              ></i>
              <i
                className="bx bxs-trash del"
                onClick={() => deleteItem(curElem.id)}
              ></i>
            </div>
          ))}
        </ul>

        {tasks.length > 0 && (
          <button className="clear" onClick={() => setTasks([])}>
            Remove all
          </button>
        )}
        {tasks.length > 0 && (
          <p className="count">
            <span>{tasks.length}</span> items left to complete.
          </p>
        )}
      </div>
    </div>
  );
};
