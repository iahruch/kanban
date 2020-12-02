export interface BoardInterface {
  id?: string;
  title?: string;
  priority?: number;
  tasks?: TasksInterface[];
}

export interface TasksInterface {
  description?: string;
  label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}
