import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkListboxModule} from '@angular/cdk/listbox';
import {MatListModule} from '@angular/material/list';
// import { ICaseStudy, ISandboxTest, TestbedModel } from '@xorsafe/testbed';
import { ICaseStudy, TestbedModel } from '../testbed/testbed-model';
import { ISandboxTest } from '../test-selecting-platform/test-selecting-platform.component';
import {CdkListbox, CdkOption} from '@angular/cdk/listbox';
import {CdkMenuModule, CdkMenuTrigger} from '@angular/cdk/menu';

@Component({
  selector: 'app-test-selection-list',
  standalone: true,
  imports: [CommonModule, CdkMenuModule ,CdkListboxModule,CdkListbox, CdkOption,MatListModule],
  templateUrl: './test-selection-list.component.html',
  styleUrl: './test-selection-list.component.scss',
})
export class TestSelectionListComponent {
  @Input() tests!: ISandboxTest[];
  @Input() selected!: ISandboxTest;
  @Output() testbedChanged = new EventEmitter<ISandboxTest>();
  @Output() caseChangedForTestbed = new EventEmitter<ICaseStudyChangeEvent>();
  @Output() themeChangedForTestbed = new EventEmitter<IThemeChangeEvent>();

  
  currentMenuOpenedForTestbed!:TestbedModel;

}

export interface IThemeChangeEvent{
  testbed:TestbedModel;
  index:number;
}

export interface ICaseStudyChangeEvent{
  testbed:TestbedModel;
  index:number;
}
