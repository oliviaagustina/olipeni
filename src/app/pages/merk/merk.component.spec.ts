import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerkComponent } from './merk.component';

describe('MerkComponent', () => {
  let component: MerkComponent;
  let fixture: ComponentFixture<MerkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
