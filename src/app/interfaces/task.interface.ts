export interface Task {
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
}