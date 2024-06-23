# Angular Testbed
Testing reactive angular components in a standalone environrnment has always been a problem. This library provides a neat component that can be placed in its own route inside the application and it provides a platform for setting up frontend tests with different data points for the same code.

## Sandbox testing in your own source
xor-testbed provides simple components and patterns to create a sandbox based testing environment in your angular(v2+) app. It keeps the integration layer thin and separate and provides a dedicated view for managing all your sandboxes. The testbed is minimal and runs in your angular app where you give it a special route as shown below. You can make changes to the data model within the testbed and copy the configuration model which can be pasted in place where the test was written making incremental testing both easier and mutable.

## Integration

Even though the initial setup may seem a bit extended here, progressive iterations are much easier. You should only require to create a main testbed class and a testing class with minor updates to the list and models wherever necessary.

### Add angular material with animations enabled
This library depends on angular material so add it as described [here](https://material.angular.io/guide/getting-started)

### Special route for the testbed

Wherever you have configured your routes for your application (by default it is in ```app.routes.ts```), you need to add a new route that serves to contain the full testbed

```typescript
export const routes: Routes = [
    {path:'', redirectTo: 'testbed', pathMatch: 'full'},// in your case, this will be different
    // ... other routes
    {path: 'testbed', component: TestbedComponent}// <--this is what you need to add
];

```

```TestbedComponent``` is a special container component that you will need to add. The sole responsibility of this component is to listwise host the SandboxTests and call on the this library's main ```TestSelectingPlatformComponent``` with those sandbox list as input. We can generate a simple TestbedComponent by issuing the command

```ng g c testbed --inline-template --inline-style --skip-tests --project=your-app --flat=true``` 

Specifying the ___project flag___ is necessary if you have multiple projects in the workspace and/or you need to be explicit.

This is the minimal setup needed to run the testbed with testbed code roughly being:

``` typescript

@Component({
  selector: 'app-testbed',
  standalone: true,
  imports: [TestSelectingPlatformComponent],
  template: `<xor-test-selecting-platform [tests]="tests"></xor-test-selecting-platform>`,
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

```

```ISandboxTest``` holds all the information about a sandbox like testing component, case studies and of course name and description. The list is supplied to the test selecting platform which uses it to display the currently selected test.

### Creating frontend tests

Each ```ISandboxTest``` holds a model and a component type

```typescript
export interface ISandboxTest{
  model: TestbedModel;
  component: ComponentType<AbstractTestbed>;
}
```

* A ```TestbedModel``` is a simple class holding information about a test and its case studies.
* A ```ComponentType<AbstractTestbed>``` is the testing component that you will be using to test your main component. This class needs to extend ```AbstractTestbed``` which only needs to return the same model as the one used in the ISandboxTest class.

## Example

Here is an example of ```ISandboxTest``` as a list

``` typescript
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

```

Here is an example of a testing component ```MyComponent1TestComponent```.

```typescript
@Component({
  selector: 'app-my-component1',
  standalone: true,
  imports: [CommonModule],
  template: `
  <span
    [ngClass]="{
        'font-bold':bold,
        'italic':italic,
        'underline':underline,
        'line-through':strikethrough
    }"
>
    {{message}}
</span>

  `,
  styles: ``
})
export class MyComponent1Component { //<--Component to test
  @Input() bold = false;
  @Input() italic = false;
  @Input() strikethrough = false;
  @Input() underline = false;
  @Input() message = 'This is a message from my-component1';
}

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
export class MyComponent1TestComponent extends AbstractTestbed{ //<--Testing component
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

```

## Licence
Licensed under **MIT**