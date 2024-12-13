import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoOrderDetailsComponent } from './cargo-order-details.component';

describe('CargoOrderDetailsComponent', () => {
  let component: CargoOrderDetailsComponent;
  let fixture: ComponentFixture<CargoOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CargoOrderDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargoOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
