import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Downlinks } from './downlinks';

describe('Downlinks', () => {
  let component: Downlinks;
  let fixture: ComponentFixture<Downlinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Downlinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Downlinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
