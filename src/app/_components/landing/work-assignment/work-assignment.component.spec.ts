import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAssignmentComponent } from './work-assignment.component';

describe('WorkAssignmentComponent', () => {
  let component: WorkAssignmentComponent;
  let fixture: ComponentFixture<WorkAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
