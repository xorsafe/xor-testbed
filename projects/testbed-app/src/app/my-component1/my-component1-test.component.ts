import { Component } from '@angular/core';
import { AbstractTestbed, ISandboxTest, TestbedModel } from '../../../../xor-testbed/src/public-api';
import { MyComponent1Component } from './my-component1.component';

@Component({
  selector: 'app-my-component1-test',
  standalone: true,
  imports: [MyComponent1Component],
  template: `
    <app-my-component1
      [bold]="data.bold"
      [italic]="data.italic"
      [strikethrough]="data.strikethrough"
      [underline]="data.underline"
      [message]="data.message"
    ></app-my-component1>
  `,
  styles: ``
})
export class MyComponent1TestComponent extends AbstractTestbed{
  override get model(): TestbedModel {
    return testbedModel;
  }
}

export const testbedModel:TestbedModel = new TestbedModel("Stylable text", "Text that can be styled through different ways procdedurally");

testbedModel.caseStudies = [
  {
    name:"Basic",
    description:"No styling",
    data: {
      bold: false,
      italic: false,
      strikethrough: false,
      underline: false,
      message: 'This text is stylable'
    }
  },
  {
    name: "Bold",
    description: "Only bold text",
    data: {
      bold: true,
      italic: false,
      strikethrough: false,
      underline: false,
      message: "This text is stylable"
    }
  },
  {
    name: "Italic",
    description: "Only italic text",
    data: {
      bold: false,
      italic: true,
      strikethrough: false,
      underline: false,
      message: "This text is stylable"
    }
  }
]