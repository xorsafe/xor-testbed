import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSelectingPlatformComponent } from './test-selecting-platform.component';
import { TestSelectionListComponent } from '../test-selection-list/test-selection-list.component';
import { TestDataEditorComponent } from '../test-data-editor/test-data-editor.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

describe('TestSelectingPlatformComponent', () => {
  let component: TestSelectingPlatformComponent;
  let fixture: ComponentFixture<TestSelectingPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule,TestSelectingPlatformComponent, TestSelectionListComponent, TestDataEditorComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestSelectingPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
