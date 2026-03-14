import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllToDos, updateToDo } from "../api/todoApi";
import { GetTodosParams, SortBy, StatusFilter, ToDo } from "../types/todo";
import { FaCheck } from "react-icons/fa";

const PREVIEW_COUNT = 4;

const HomePage = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("title");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  const fetchTodos = async () => {
    setLoading(true);
    setError(false);
    try {
      const params: GetTodosParams = {};
      if (statusFilter !== "all") params.status = statusFilter;
      params.sortBy = sortBy;
      if (search) params.search = search;
      const data = await getAllToDos(params);
      setTodos(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [statusFilter, sortBy, debouncedSearch]);

  const toggleTodoStatus = async (todo: ToDo) => {
    try {
      const updated = await updateToDo(todo.id, { status: !todo.status });
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
    } catch {
      alert("Failed to update todo.");
    }
  };

  const preview = todos.slice(0, PREVIEW_COUNT);

  return (
    <div className="app">
      <h1 className="page-title">
        TODO <span>LIST</span>
      </h1>

      <div className="home-container">
        <div className="toolbar">
          <div className="toolbar-row">
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            >
              <option value="all">All</option>
              <option value="complete">Complete</option>
              <option value="incomplete">Incomplete</option>
            </select>

            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
            >
              <option value="title">Sort by title</option>
              <option value="status">Sort by status</option>
            </select>

            <input
              type="text"
              className="search-input"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading && <p className="loading">Loading</p>}
        {error && <p className="error-msg">Failed to load todos</p>}
        {!loading && !error && (
          <>
            <div className="todo-list">
              {preview.length === 0 && (
                <p className="empty-msg">No todos found.</p>
              )}

              {preview.map((todo) => (
                <div key={todo.id} className="todo-card">
                  <button
                    className={`todo-card-checkbox ${todo.status ? "completed" : ""}`}
                    onClick={() => toggleTodoStatus(todo)}
                  >
                    <FaCheck
                      size={16}
                      color={todo.status ? "#4caf50" : "#ccc"}
                    />
                  </button>
                  <div className="todo-card-content">
                    <div className="todo-card-title">{todo.title}</div>
                    <div className="todo-card-description">
                      {todo.description}
                    </div>
                  </div>
                  <button
                    className="btn-view"
                    onClick={() => navigate(`/todo/${todo.id}`)}
                  >
                    VIEW
                  </button>
                </div>
              ))}
            </div>

            {todos.length > PREVIEW_COUNT && (
              <button
                className="view-all-link"
                onClick={() => navigate("/all")}
              >
                View All
              </button>
            )}

            <button className="btn-add-todo" onClick={() => navigate("/add")}>
              Add Todo
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
