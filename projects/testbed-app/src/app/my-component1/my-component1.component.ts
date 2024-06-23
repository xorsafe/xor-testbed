import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-component1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-component1.component.html',
  styles: ``
})
export class MyComponent1Component {
  @Input() bold = false;
  @Input() italic = false;
  @Input() strikethrough = false;
  @Input() underline = false;
  @Input() message = 'This is a message from my-component1';
}
