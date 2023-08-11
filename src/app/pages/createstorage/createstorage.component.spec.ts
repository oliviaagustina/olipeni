import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatestorageComponent } from './createstorage.component';

describe('CreatestorageComponent', () => {
  let component: CreatestorageComponent;
  let fixture: ComponentFixture<CreatestorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatestorageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatestorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
