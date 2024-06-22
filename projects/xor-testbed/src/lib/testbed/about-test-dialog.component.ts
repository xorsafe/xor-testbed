import { Component, Inject, Input } from '@angular/core';
import { ICaseStudy } from './testbed-model';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CdkContextMenuTrigger, CdkMenu, CdkMenuGroup, CdkMenuItem, CdkMenuItemCheckbox, CdkMenuItemRadio, CdkMenuModule, CdkMenuTrigger } from '@angular/cdk/menu';
import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-about-test-dialog',
	standalone: true,
	imports: [CommonModule, DialogModule,CdkContextMenuTrigger, CdkMenu, CdkMenuItem, CdkMenuItemRadio, CdkMenuTrigger, CdkMenuGroup, CdkMenuItemCheckbox, CdkMenuGroup],
	template: `
		<div class="h-96 bg-white px-8 py-4">
			<h3 class="text-md font-light text-slate-500">Testbed</h3>
				<p>
					{{data.description}}
				</p>
			<hr/>
			<h3  *ngIf="data.case" class="text-md font-light text-slate-500">Case</h3>
				<p *ngIf="data.case">
					{{data.case.name}}
				</p>
			<hr *ngIf="data.case"/>
			<h3  *ngIf="data.case" class="text-md font-light text-slate-500">Description</h3>
				<p *ngIf="data.case">
					{{data.case.description}}
				</p>
			<hr *ngIf="data.case"/>
		</div>
  `,
	styles: [
	]
})
export class AboutTestDialogComponent {


	constructor(@Inject(DIALOG_DATA) public data: AboutDialogData) {

	}
}

export interface AboutDialogData {
	description: string;
	baseCase: ICaseStudy;
	case: ICaseStudy;
	data: any;
}