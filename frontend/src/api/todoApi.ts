import axios from "axios";
import { ToDo, CreateTodoDto, UpdateTodoDto, GetTodosParams } from "../types/todo";

const BASE_URL = "/api/todos";

export const getAllToDos = async (params?: GetTodosParams): Promise<ToDo[]> => {
  const { data } = await axios.get(`${BASE_URL}/get-all-todos`, { params });
  return data.data;
};

export const getToDoById = async (id: string): Promise<ToDo> => {
  const { data } = await axios.get(`${BASE_URL}/get-todo/${id}`);
  return data.data;
};

export const createToDo = async (payload: CreateTodoDto): Promise<ToDo> => {
  const { data } = await axios.post(`${BASE_URL}/create-todo`, payload);
  return data.data;
};

export const updateToDo = async (
  id: string,
  payload: UpdateTodoDto,
): Promise<ToDo> => {
  const { data } = await axios.put(`${BASE_URL}/update-todo/${id}`, payload);
  return data.data;
};

export const deleteToDo = async (id: string): Promise<void> => {
  const { data } = await axios.delete(`${BASE_URL}/delete-todo/${id}`);
  return data.data;
};

