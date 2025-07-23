import { LightningElement } from 'lwc';

export default class ToDo extends LightningElement {
  newTask = '';
  tasks = [];

  handleInputChange(event) {
    this.newTask = event.target.value;
  }

  addTask() {
    if (this.newTask.trim() === '') return;

    const task = {
      id: Date.now(),
      name: this.newTask,
      completed: false
    };

    this.tasks = [...this.tasks, task];
    this.newTask = '';
  }

  toggleTaskCompletion(event) {
    const taskId = parseInt(event.target.dataset.id, 10);
    this.tasks = this.tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: event.target.checked }
        : task
    );
  }

  deleteTask(event) {
    const taskId = parseInt(event.target.dataset.id, 10);
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}