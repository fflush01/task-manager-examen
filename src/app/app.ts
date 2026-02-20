import { Component } from '@angular/core';
import { ContentComponent } from './components/content/content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContentComponent], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'task-manager';
}