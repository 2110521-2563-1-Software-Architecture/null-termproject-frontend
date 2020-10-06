import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplePage1Component } from './example-page1.component';

describe('ExamplePage1Component', () => {
  let component: ExamplePage1Component;
  let fixture: ComponentFixture<ExamplePage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamplePage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplePage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
