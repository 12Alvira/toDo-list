import { v4 as uuidv4 } from "uuid";
import { ToDo, CreateTodoDto, UpdateTodoDto } from "../types/toDo.types";

const todos: ToDo[] = [
  {
    id: uuidv4(),
    title: "ToDo List",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "ToDo List",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "ToDo List",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "ToDo List",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "ToDo List",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "ToDo List",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const getAllTodos = (): ToDo[] => {
  return todos;
};

const getTodoById = (id: string): ToDo | undefined => {
  return todos.find((t) => t.id === id);
};

const createTodo = (dto: CreateTodoDto): ToDo => {
  const newTodo: ToDo = {
    id: uuidv4(),
    title: dto.title,
    description: dto.description ?? "",
    status: dto.status ?? false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  return newTodo;
};

const updateTodo = (id: string, dto: UpdateTodoDto): ToDo | undefined => {
  const index = todos.findIndex((t) => t.id === id);
  if (index < 0) return;

  const todo = todos[index];

  if (dto.title) todo.title = dto.title;
  if (dto.description) todo.description = dto.description;
  if (dto.status !== undefined) todo.status = dto.status;

  todo.updatedAt = new Date().toISOString();

  return todo;
};

const deleteTodo = (id: string): boolean => {
  const index = todos.findIndex((t) => t.id === id);
  if (index < 0) return false;

  todos.splice(index, 1);
  return true;
};

export default {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
