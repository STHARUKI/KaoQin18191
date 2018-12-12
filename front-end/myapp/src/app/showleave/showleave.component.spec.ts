import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowleaveComponent } from './showleave.component';

describe('ShowleaveComponent', () => {
  let component: ShowleaveComponent;
  let fixture: ComponentFixture<ShowleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
