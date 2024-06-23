import { Component } from '@angular/core';
import { MyComponent2Component } from './my-component2.component';
import { AbstractTestbed, TestbedModel } from '../../../../xor-testbed/src/public-api';

@Component({
  selector: 'app-my-component2-test',
  standalone: true,
  imports: [MyComponent2Component],
  template: `
    <app-my-component2
      [textColor]="data.textColor"
      [backgroundColor]="data.backgroundColor"
      [message]="data.message"
    ></app-my-component2>
  `,
  styles: ``
})
export class MyComponent2TestComponent extends AbstractTestbed{
  override get model(): TestbedModel {
    return testbedModel;
  }

}


export const testbedModel:TestbedModel = new TestbedModel("Highlightable text", "Text that can be highlighted with different colors");

testbedModel.caseStudies = [
  {
    name:"No Highlight",
    description:"Simple black and white",
    data: {
      textColor: 'black',
      backgroundColor: 'white',
      message: 'This label is highlightable'
    }
  }
]