import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoOrderComponent } from './cargo-order.component';

describe('CargoOrderComponent', () => {
  let component: CargoOrderComponent;
  let fixture: ComponentFixture<CargoOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CargoOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargoOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
