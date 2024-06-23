import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-component2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-component2.component.html',
  styles: ``
})
export class MyComponent2Component {
  @Input() message = 'Message from component 2';
  @Input() textColor = 'black';
  @Input() backgroundColor = 'white';
}
