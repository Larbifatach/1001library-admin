import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryColor } from './library-color';

describe('LibraryColor', () => {
  let component: LibraryColor;
  let fixture: ComponentFixture<LibraryColor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryColor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryColor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
