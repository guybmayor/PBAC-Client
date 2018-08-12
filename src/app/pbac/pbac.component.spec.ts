import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbacComponent } from './pbac.component';

describe('PbacComponent', () => {
  let component: PbacComponent;
  let fixture: ComponentFixture<PbacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
