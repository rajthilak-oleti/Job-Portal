import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerManageJobComponent } from './jobseeker-manage-job.component';

describe('JobseekerManageJobComponent', () => {
  let component: JobseekerManageJobComponent;
  let fixture: ComponentFixture<JobseekerManageJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekerManageJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerManageJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
