import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacolumnComponent } from './datacolumn.component';

describe('DatacolumnComponent', () => {
  let component: DatacolumnComponent;
  let fixture: ComponentFixture<DatacolumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacolumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
