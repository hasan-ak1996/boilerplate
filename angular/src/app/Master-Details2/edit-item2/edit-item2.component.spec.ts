import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItem2Component } from './edit-item2.component';

describe('EditItem2Component', () => {
  let component: EditItem2Component;
  let fixture: ComponentFixture<EditItem2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditItem2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditItem2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
