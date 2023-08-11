import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailinventoryComponent } from './detailinventory.component';

describe('DetailinventoryComponent', () => {
  let component: DetailinventoryComponent;
  let fixture: ComponentFixture<DetailinventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailinventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
