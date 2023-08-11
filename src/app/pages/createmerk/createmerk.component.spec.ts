import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemerkComponent } from './createmerk.component';

describe('CreatemerkComponent', () => {
  let component: CreatemerkComponent;
  let fixture: ComponentFixture<CreatemerkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatemerkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatemerkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
