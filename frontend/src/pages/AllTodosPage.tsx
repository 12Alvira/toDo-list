import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllToDos } from "../api/todoApi";
import { ToDo } from "../types/todo";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

const AllTodosPage = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getAllToDos();
      setTodos(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <h1 className="page-title">
        TODO <span>LIST</span>
      </h1>
      <button className="back-btn" onClick={() => navigate("/")}>
        <IoMdArrowBack size={16} />
        Back
      </button>
      <div className="all-todos-container">
        {loading && <p className="loading">Loading</p>}
        {error && <p className="error-msg">Failed to load todos</p>}
        {!loading && !error && (
          <div className="todos-grid">
            {todos.length === 0 && <p className="empty-msg">No todos</p>}
            {todos.map((todo) => (
              <div key={todo.id} className="todo-grid-card">
                <div
                  className={`card-check ${todo.status ? "completed" : "incomplete"}`}
                >
                  <FaCheck size={16} color={todo.status ? "#4caf50" : "#ccc"} />
                </div>
                <div className="card-title">{todo.title}</div>
                <div className="card-description">{todo.description}</div>
                <button
                  className="btn-view"
                  onClick={() => navigate(`/todo/${todo.id}`)}
                >
                  VIEW
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTodosPage;
