import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryDeletes } from './library-deletes';

describe('LibraryDeletes', () => {
  let component: LibraryDeletes;
  let fixture: ComponentFixture<LibraryDeletes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryDeletes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryDeletes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
