import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage';
import AllTodosPage from './pages/AllTodosPage';
import TodoDetailPage from './pages/TodoDetailPage';
import AddTodoPage from './pages/AddTodoPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all" element={<AllTodosPage />} />
        <Route path="/todo/:id" element={<TodoDetailPage />} />
        <Route path="/add" element={<AddTodoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
