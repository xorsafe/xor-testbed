import { Component } from '@angular/core';
import { ISandboxTest, TestSelectingPlatformComponent } from '../../../../xor-testbed/src/public-api';
import { MyComponent1TestComponent, testbedModel as t1 } from '../my-component1/my-component1-test.component';
import { MyComponent2TestComponent, testbedModel as t2 } from '../my-component2/my-component2-test.component';

@Component({
  selector: 'app-testbed',
  standalone: true,
  imports: [TestSelectingPlatformComponent],
  templateUrl: './testbed.component.html',
  styles: ``
})
export class TestbedComponent {
  tests:ISandboxTest[] = [
    {
      model: t1,
      component: MyComponent1TestComponent
    },
    {
      model: t2,
      component: MyComponent2TestComponent
    }
  ]
}
