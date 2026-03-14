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
  description: string;
  status: boolean;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  status?: boolean;
}

export interface GetTodosParams {
  status?: 'complete' | 'incomplete';
  sortBy?: 'title' | 'status';
  search?: string;
}

export type StatusFilter = "all" | "complete" | "incomplete";

export type SortBy = "title" | "status";