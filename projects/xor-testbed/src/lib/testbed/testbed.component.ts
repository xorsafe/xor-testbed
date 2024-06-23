import { Component, OnInit } from '@angular/core';
import { AbstractTestbed, provideComponentsForTesting } from './abstract-testbed';
import { TestbedModel } from './testbed-model';
import { ISandboxTest } from '../test-selecting-platform/test-selecting-platform.component';

@Component({
  selector: 'xor-testbed',
  standalone: true,
  imports: provideComponentsForTesting(),
  template: `<h1 (click)='myPrintFunction("test message")'>{{data.message}}</h1>`,
  styles: [],
})
export class TestbedComponent extends AbstractTestbed implements OnInit {
  myPrintFunction(message: string) {
    console.log(message);
  }

  override get model(): TestbedModel {
    return exampleTestbedModel;
  }

}


export const exampleTestbedModel:TestbedModel = new TestbedModel("Example Testbed", "Sample testbed used as an example");

exampleTestbedModel.caseStudies = [
  {
    name:"Hello",
    description:"Opening messsage",
    data:{
      message:"Hello World"
    }
  },
  {
    name:"Goodbye",
    description:"Closing message",
    data:{
      message:"Goodbye World"
    }
  }
]

export const exampleSandboxTest:ISandboxTest = {
  model:exampleTestbedModel,
  component:TestbedComponent
}