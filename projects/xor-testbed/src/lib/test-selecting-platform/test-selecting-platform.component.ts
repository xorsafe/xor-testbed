import { AfterViewInit, Component, ComponentRef, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TestbedModel} from '../testbed/testbed-model';
import { AbstractTestbed} from '../testbed/abstract-testbed';
import { exampleSandboxTest } from '../testbed/testbed.component';
import { CdkPortalOutlet, ComponentPortal, ComponentType, PortalModule, } from '@angular/cdk/portal'
import { ICaseStudyChangeEvent, IThemeChangeEvent, TestSelectionListComponent } from '../test-selection-list/test-selection-list.component';
import { TestDataEditorComponent } from '../test-data-editor/test-data-editor.component';

@Component({
  selector: 'xor-test-selecting-platform',
  standalone: true,
  imports: [CommonModule, TestSelectionListComponent, TestDataEditorComponent, PortalModule, MatSidenavModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './test-selecting-platform.component.html',
  styleUrl: './test-selecting-platform.component.scss',
})
export class TestSelectingPlatformComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() tests: ISandboxTest[] = [
    exampleSandboxTest
  ];


  testData!:any;
  currentTest!: ISandboxTest;
  private componentRef!: ComponentRef<AbstractTestbed>;
  @ViewChild(CdkPortalOutlet) selectedPortalOutlet!: CdkPortalOutlet;
  selectedPortal!: ComponentPortal<AbstractTestbed>;

  ngOnInit(): void {
    this.currentTest = this.tests[0];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.switchTestbed();
    },300) // <--- To avoid initialization error: Expression changed after it was checked
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['testData']) {
      this.componentRef.instance.data = this.testData;
      console.log(this.testData);
    }
  }

  print(message:string){
    console.log(message);
  }

  /** Switches to the current sandbox test */
  switchTestbed() {

    this.selectedPortal = new ComponentPortal(this.currentTest.component);
    if (this.selectedPortalOutlet.hasAttached()) {
      this.selectedPortalOutlet.detach();
    }
    this.componentRef = this.selectedPortalOutlet.attach(this.selectedPortal);
    this.testData = this.currentTest.model.selectedCaseStudy.data;
    this.componentRef.instance.data = this.testData;
  }

  testbedChanged(event: ISandboxTest) {
    this.currentTest = event;
    this.switchTestbed();
  }

  changeCaseStudyForTestbed(event: ICaseStudyChangeEvent) {
    event.testbed.selectedCaseStudyIndex = event.index;
    this.testData = this.currentTest.model.selectedCaseStudy.data;
    this.componentRef.instance.data = this.testData;
  }

  changeThemeForTestbed(event: IThemeChangeEvent) {
    event.testbed.currentThemeIndex = event.index;
  }

  dataChanged(event: any) {
    this.testData = event;
    this.componentRef.instance.data = this.testData;
  }

  resetData() {
    this.testData = this.currentTest.model.selectedCaseStudy.data;
    this.componentRef.instance.data = this.testData;
  }

}

export interface ISandboxTest{
  model: TestbedModel;
  component: ComponentType<AbstractTestbed>;
}