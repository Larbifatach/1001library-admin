import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uploaders } from './uploaders';

describe('Uploaders', () => {
  let component: Uploaders;
  let fixture: ComponentFixture<Uploaders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uploaders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uploaders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
