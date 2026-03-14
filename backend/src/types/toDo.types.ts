export interface ToDo {
  id: string;
  title: string;
  description: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  status?: boolean;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  status?: boolean;
}
