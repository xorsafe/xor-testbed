import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XorTestbedComponent } from './xor-testbed.component';

describe('XorTestbedComponent', () => {
  let component: XorTestbedComponent;
  let fixture: ComponentFixture<XorTestbedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XorTestbedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XorTestbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
