import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarySelects } from './library-selects';

describe('LibrarySelects', () => {
  let component: LibrarySelects;
  let fixture: ComponentFixture<LibrarySelects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrarySelects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrarySelects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
