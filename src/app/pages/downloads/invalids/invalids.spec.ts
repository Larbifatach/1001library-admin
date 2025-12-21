import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Invalids } from './invalids';

describe('Invalids', () => {
  let component: Invalids;
  let fixture: ComponentFixture<Invalids>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Invalids]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Invalids);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
