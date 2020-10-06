import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplePage2Component } from './example-page2.component';

describe('ExamplePage2Component', () => {
  let component: ExamplePage2Component;
  let fixture: ComponentFixture<ExamplePage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamplePage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplePage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
