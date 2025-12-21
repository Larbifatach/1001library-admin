import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryCards } from './library-cards';

describe('LibraryCards', () => {
  let component: LibraryCards;
  let fixture: ComponentFixture<LibraryCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
