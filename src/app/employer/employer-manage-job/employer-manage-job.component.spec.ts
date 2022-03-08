import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerManageJobComponent } from './employer-manage-job.component';

describe('EmployerManageJobComponent', () => {
  let component: EmployerManageJobComponent;
  let fixture: ComponentFixture<EmployerManageJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerManageJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerManageJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
