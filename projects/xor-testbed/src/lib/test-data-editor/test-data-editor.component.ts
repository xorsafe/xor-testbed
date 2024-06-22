import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {ClipboardModule,Clipboard} from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-test-data-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, ClipboardModule, MatTooltipModule],
  templateUrl: './test-data-editor.component.html',
  styleUrl: './test-data-editor.component.scss',
})
export class TestDataEditorComponent {
  @Output() dataChanged = new EventEmitter<any>();
  @Output() resetData = new EventEmitter<void>();
  @Input() name!:string;
  @Input() description!:string;
  @Input() data!: any;

  constructor(private _snackBar:MatSnackBar,private _clipboard: Clipboard){}

  convertToJsonAndSendData(value:string){
    try {
      const jsonData = JSON.parse(value);
      this.dataChanged.emit(jsonData);
    } catch (err) {
      // not a valid json
      this._snackBar.open("Invalid JSON", "OK");
    }
  }

  copyCaseStudyToClipboard(name:string,description:string,data:any){
    const testData = JSON.parse(data)
    const caseStudy = { name, description, data:testData };
    const withQuotes = JSON.stringify(caseStudy,null,2);
    // Remove quotes around keys
    const withoutQuotesForKeys = withQuotes.replace(/"([^"]+)":/g, '$1:');
    this._clipboard.copy(withoutQuotesForKeys);
    this._snackBar.open("Copied case study to clipboard", "OK");
  }
}
