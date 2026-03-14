import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteToDo, getToDoById, updateToDo } from "../api/todoApi";
import { ToDo } from "../types/todo";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

const TodoDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [todo, setTodo] = useState<ToDo | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const fetchTodo = async () => {
    if (!id) return;
    setLoading(true);
    setError(false);
    try {
      const data = await getToDoById(id);
      setTodo(data);
      setTitle(data.title);
      setDescription(data.description);
      setStatus(data.status);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleUpdate = async () => {
    if (!id || !title.trim()) return;
    setSaving(true);
    try {
      const updated = await updateToDo(id, { title, description, status });
      setTodo(updated);
      showToast("Updated successfully");
    } catch {
      console.log("failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await deleteToDo(id);
      navigate("/");
    } catch {
      console.log("failed to delete");
    }
  };

  if (loading)
    return (
      <div className="app">
        <div className="home-container">
          <p className="loading">Loading</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="app">
        <div className="home-container">
          <p className="error-msg">Failed to load todo</p>
        </div>
      </div>
    );

  if (!todo)
    return (
      <div className="app">
        <div className="home-container">
          <p className="error-msg">Todo not found</p>
        </div>
      </div>
    );

  return (
    <div className="app">
      <h1 className="page-title">
        TODO <span>LIST</span>
      </h1>
      <button className="back-btn" onClick={() => navigate("/")}>
        <IoMdArrowBack size={16} />
        Back
      </button>
      <div className="detail-container">
        <div
          style={{
            display: "flex",
            gap: "30px",
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          <div className="finish-section">
            <span>FINISH</span>
            <button
              className={`finish-btn ${status ? "completed" : ""}`}
              onClick={() => setStatus((prev) => !prev)}
            >
              <FaCheck size={20} color={status ? "#222" : "#fff"} />
            </button>
          </div>
          <div className="field-group" style={{ flex: 1 }}>
            <span>TITLE</span>
            <input
              className="field-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="TODO TITLE"
            />
          </div>
        </div>

        <div className="field-group">
          <span>DESCRIPTION</span>
          <textarea
            className="field-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add description"
          />
        </div>

        <button
          className="btn-update"
          onClick={handleUpdate}
          disabled={saving || !title.trim()}
        >
          {saving ? "Saving" : "UPDATE"}
        </button>

        <button className="btn-delete" onClick={handleDelete}>
          DELETE
        </button>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default TodoDetailPage;
