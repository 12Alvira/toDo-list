import { Router } from 'express';
import toDoController from '../controllers/toDo.controller'

const router = Router();

router.get('/get-all-todos', toDoController.getAllTodos);
router.get('/get-todo/:id', toDoController.getTodoById);
router.post('/create-todo', toDoController.createTodo);
router.put('/update-todo/:id', toDoController.updateTodo);
router.delete('/delete-todo/:id', toDoController.deleteTodo);

export default router;
