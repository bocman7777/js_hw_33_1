import React, { useState } from "react";

export default function App() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const handleAdd = () => {
        if (text.trim() === "") {
            setError("Поле не може бути порожнім");
            return;
        }
        setTodos([...todos, { id: Date.now(), text, completed: false }]);
        setText("");
        setError("");
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    return (
        <div style={{ margin: "20px", fontFamily: "Arial" }}>
            <h1>TODO</h1>
            <input
                placeholder="Введіть завдання"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleAdd}>Додати</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span
                            style={{
                                textDecoration: todo.completed ? "line-through" : "none",
                            }}
                        >
              {todo.text}
            </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
