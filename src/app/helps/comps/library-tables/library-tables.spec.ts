import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryTables } from './library-tables';

describe('LibraryTables', () => {
  let component: LibraryTables;
  let fixture: ComponentFixture<LibraryTables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryTables]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryTables);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
