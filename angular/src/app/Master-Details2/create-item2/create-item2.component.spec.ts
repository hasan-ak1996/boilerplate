import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItem2Component } from './create-item2.component';

describe('CreateItem2Component', () => {
  let component: CreateItem2Component;
  let fixture: ComponentFixture<CreateItem2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateItem2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItem2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
