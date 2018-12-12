import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowoutComponent } from './showout.component';

describe('ShowoutComponent', () => {
  let component: ShowoutComponent;
  let fixture: ComponentFixture<ShowoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
