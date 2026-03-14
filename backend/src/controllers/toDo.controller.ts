import { Request, Response } from "express";
import { CreateTodoDto, ToDo, UpdateTodoDto } from "../types/toDo.types";
import httpStatus from "../utils/httpStatus";
import toDoService from "../services/toDo.service";

const getAllTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    let todos: ToDo[] = toDoService.getAllTodos();

    const status = req.query.status as string;
    if (status) {
      if (status.toLowerCase() === "complete") {
        todos = todos.filter((todo) => todo.status);
      } else if (status.toLowerCase() === "incomplete") {
        todos = todos.filter((todo) => !todo.status);
      }
    }

    const search = req.query.search as string;
    if (search) {
      const lowerSearch = search.toLowerCase();
      todos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(lowerSearch),
      );
    }

    const sortBy = req.query.sortBy as string;
    if (sortBy) {
      if (sortBy === "title") {
        todos.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortBy === "status") {
        todos.sort((a, b) => Number(a.status) - Number(b.status));
      }
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "fetched successfully",
      data: todos,
    });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const todo = toDoService.getTodoById(id);

    if (!todo) {
      res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Todo not found",
        data: null,
      });
      return;
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "Todo fetched successfully",
      data: todo,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body as CreateTodoDto;

    if (!title || title.trim() === "") {
      res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Title is required",
        data: null,
      });
      return;
    }

    const newTodo = toDoService.createTodo({
      title: title.trim(),
      description,
      status,
    });

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dto = req.body as UpdateTodoDto;

    const updatedTodo = toDoService.updateTodo(id, dto);

    if (!updatedTodo) {
      res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Todo not found",
        data: null,
      });
      return;
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = toDoService.deleteTodo(id);

    if (!deleted) {
      res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Todo not found",
        data: null,
      });
      return;
    }

    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

export default {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
