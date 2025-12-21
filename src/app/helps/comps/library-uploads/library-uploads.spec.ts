import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryUpload } from './library-upload';

describe('LibraryUpload', () => {
  let component: LibraryUpload;
  let fixture: ComponentFixture<LibraryUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
