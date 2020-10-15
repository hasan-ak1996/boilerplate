import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrder2Component } from './edit-order2.component';

describe('EditOrder2Component', () => {
  let component: EditOrder2Component;
  let fixture: ComponentFixture<EditOrder2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrder2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrder2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
