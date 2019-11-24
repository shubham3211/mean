import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusineComponent } from './cusine.component';

describe('CusineComponent', () => {
  let component: CusineComponent;
  let fixture: ComponentFixture<CusineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
