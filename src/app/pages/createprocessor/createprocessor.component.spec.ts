import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateprocessorComponent } from './createprocessor.component';

describe('CreateprocessorComponent', () => {
  let component: CreateprocessorComponent;
  let fixture: ComponentFixture<CreateprocessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateprocessorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateprocessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
