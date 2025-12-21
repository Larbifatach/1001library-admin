import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryNums } from './library-nums';

describe('LibraryNums', () => {
  let component: LibraryNums;
  let fixture: ComponentFixture<LibraryNums>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryNums]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryNums);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
