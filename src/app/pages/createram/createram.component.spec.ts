import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateramComponent } from './createram.component';

describe('CreateramComponent', () => {
  let component: CreateramComponent;
  let fixture: ComponentFixture<CreateramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
