import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrders2Component } from './view-orders2.component';

describe('ViewOrders2Component', () => {
  let component: ViewOrders2Component;
  let fixture: ComponentFixture<ViewOrders2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrders2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrders2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
