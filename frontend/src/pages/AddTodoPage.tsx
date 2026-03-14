import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createToDo } from "../api/todoApi";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

const AddTodoPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await createToDo({ title, description, status });
      navigate("/");
    } catch {
      console.log("failed to create todo");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app">
      <h1 className="page-title">
        TODO <span>LIST</span>
      </h1>

      <button className="back-btn" onClick={() => navigate("/")}>
        <IoMdArrowBack size={16} />
        Back
      </button>
      <div className="add-container">
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
              <FaCheck size={24} color={status ? "#222" : "#fff"} />
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
          onClick={handleSubmit}
          disabled={saving || !title.trim()}
        >
          {saving ? "saving" : "ADD TODO"}
        </button>
      </div>
    </div>
  );
};

export default AddTodoPage;
