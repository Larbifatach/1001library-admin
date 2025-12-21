import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Suggests } from './suggests';

describe('Suggests', () => {
  let component: Suggests;
  let fixture: ComponentFixture<Suggests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Suggests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Suggests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
