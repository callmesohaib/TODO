import { useState } from "react";

export const Todo = () => {
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <>
      <div className="container">
        <h1>Todo List</h1>
        <form>
          <input
            type="text"
            placeholder=" ✍️ Add a todo..."
              value={input}
            onChange={handleInput}
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          <li>Task 1</li>
          <li>Task 2</li>
          <li>Task 3</li>
        </ul>
      </div>
    </>
  );
};
