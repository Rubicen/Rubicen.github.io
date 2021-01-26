import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingGameComponent } from './driving-game.component';

describe('DrivingGameComponent', () => {
  let component: DrivingGameComponent;
  let fixture: ComponentFixture<DrivingGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrivingGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrivingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
