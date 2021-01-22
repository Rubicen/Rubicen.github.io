import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BologneseComponent } from './bolognese.component';

describe('BologneseComponent', () => {
  let component: BologneseComponent;
  let fixture: ComponentFixture<BologneseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BologneseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BologneseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
