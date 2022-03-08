import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerAppliedJobComponent } from './jobseeker-applied-job.component';

describe('JobseekerAppliedJobComponent', () => {
  let component: JobseekerAppliedJobComponent;
  let fixture: ComponentFixture<JobseekerAppliedJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekerAppliedJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerAppliedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
