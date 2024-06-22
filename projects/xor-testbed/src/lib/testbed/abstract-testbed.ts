import { Dialog } from "@angular/cdk/dialog";
import { Directive, OnInit } from "@angular/core";
import { AboutTestDialogComponent } from "./about-test-dialog.component";
import { CommonModule } from "@angular/common";
import { CdkContextMenuTrigger, CdkMenu, CdkMenuGroup, CdkMenuItem, CdkMenuItemCheckbox, CdkMenuItemRadio, CdkMenuModule, CdkMenuTrigger } from '@angular/cdk/menu';
import { DialogModule } from '@angular/cdk/dialog';
import { ICaseStudy, TestbedModel } from "./testbed-model";


/** Every testbed class inherits from this class & abides by its protocol */
@Directive()
export abstract class AbstractTestbed implements OnInit {

	constructor(private dialog: Dialog) {

	}
	protected theme: string = 'light';
	protected _data: any;
	abstract get model():TestbedModel;
	protected listedCaseStudies!:ICaseStudy[];

	// abstract get base(): ICaseStudy;
	// abstract get caseStudies(): ICaseStudy[];

	ngOnInit(): void {
		this.initializeData();
	}

	protected resetBackToBaseCase() {
		console.log("Testbed reset back to base")
		this._data = deepCopy(this.model.selectedCaseStudy.data);
		this.listedCaseStudies = this.model.caseStudies;
	}

	/** 
	 * Used to initialize the data property in the parent method.
	 * If a child class chooses to override the onInit method, 
	 * it should firstly call this method manually 
	 */
	protected initializeData() {
		this._data = deepCopy(this.model.selectedCaseStudy.data);
	}

	print(message: string) {
		console.log(message);
	}

	/** Opens the about dialog detailing the current testbed */
	protected openAboutDialog() {
		const dialogRef = this.dialog.open<string>(AboutTestDialogComponent, {
			width: '356px',
			data: {
				description: this.model.description,
				baseCase: this.model.selectedCaseStudy,
				case: this.model.selectedCaseStudy,
				data: this.data
			}
		});

		dialogRef.closed.subscribe(result => {
			console.log("About dialog was closed");
		})
	}

	get data(){
		return this._data;
	}

	set data(t:any){
		this._data = deepCopy(t);
	}
}


/**
 * Creates a testbed with a functional context menu to visually test the html scenario
 * @param htmlCodeToTest Code that needs to be tested. This could be one component or a partial integration
 * @deprecated Use the full template raw instead
 * @returns void
 */
export function wrapWithTestbedCode(htmlCodeToTest: string) {
	return `
	<div class="w-full h-full inline-grid" [cdkContextMenuTriggerFor]="testbedMenu">
		${htmlCodeToTest}
		<ng-template #testbedMenu>
			<div class="inline-flex flex-col min-w-full max-w-lg rounded-md bg-slate-100 text-black drop-shadow-lg" cdkMenu>
				<button (click)="openAboutDialog()" class="cursor-pointer hover:bg-blue-600 hover:text-white px-8 py-2 flex flex-row items-center flex-1 select-none min-w-min" cdkMenuItem>About</button>
				<hr class="border-gray-300"/>
				<button cdkMenuItemRadio [cdkMenuItemChecked]="theme==='light'" (cdkMenuItemTriggered)="theme='light'" class="cursor-pointer aria-checked:bg-slate-400 hover:bg-blue-600 hover:text-white px-8 py-2 flex flex-row items-center flex-1 select-none min-w-min" cdkMenuItem>Light</button>
				<button cdkMenuItemRadio [cdkMenuItemChecked]="theme==='dark'" (cdkMenuItemTriggered)="theme='dark'" class="cursor-pointer aria-checked:bg-slate-400 hover:bg-blue-600 hover:text-white px-8 py-2 flex flex-row items-center flex-1 select-none min-w-min" cdkMenuItem>Dark</button>
				<hr class="border-gray-300"/>
				<button class="cursor-pointer hover:bg-blue-600 hover:text-white px-8 py-2 flex flex-row items-center flex-1 select-none min-w-min" cdkMenuItem [cdkMenuTriggerFor]="cases">Cases <span class="relative left-4">&#10148;</span></button>
			</div>
		</ng-template>
		<ng-template #cases>
			<div class="inline-flex flex-col min-w-full max-w-lg bg-slate-100 text-black drop-shadow-lg" cdkMenu>
				
				<button *ngFor="let caseStudy of listedCaseStudies;let i = index" 
					cdkMenuItem
					(cdkMenuItemTriggered)="null"
					class="cursor-pointer hover:bg-blue-600 hover:text-white px-8 py-2 flex flex-row items-center flex-1 select-none min-w-min">{{caseStudy.name}}</button>
				
				<button 
					(cdkMenuItemTriggered)="resetBackToBaseCase()"
					class="cursor-pointer hover:bg-blue-600 hover:text-white px-8 py-2 flex flex-row items-center flex-1 select-none min-w-min" cdkMenuItem>Base case</button>
				<hr class="border-gray-300"/>
			</div>
		</ng-template>
	</div>	
	`;
}

/** Creates a deep copy of the supplied object */
export function deepCopy<T>(obj: T): T {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	if (obj instanceof Array) {
		const copy: any[] = [];
		for (const item of obj) {
			copy.push(deepCopy(item));
		}
		return copy as T;
	}

	const copy: Record<string, any> = {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			copy[key] = deepCopy(obj[key]);
		}
	}
	return copy as T;
}


export function provideComponentsForTesting(): any[] {
	return [CommonModule,DialogModule,
		CdkContextMenuTrigger, CdkMenu, CdkMenuItem, CdkMenuItemRadio, CdkMenuTrigger, CdkMenuGroup, CdkMenuItemCheckbox, CdkMenuGroup]
}