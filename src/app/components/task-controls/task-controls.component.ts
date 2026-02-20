import { Component, output } from '@angular/core';

@Component({
  selector: 'app-task-controls',
  standalone: true,
  template: `
    <div style="margin: 1rem 0;">
      <button (click)="onFilterChange.emit('all')">Show All</button>
      <button (click)="onFilterChange.emit('completed')">Show Completed</button>
      <button (click)="onFilterChange.emit('pending')">Show Pending</button>
    </div>
  `
})
export class TaskControlsComponent {
  public onFilterChange = output<'all' | 'completed' | 'pending'>();
}