import {
  ChangeDetectorRef,
  ViewChild,
  OnInit,
  OnDestroy,
  Component,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeComponent } from '../dialog/employee/employee.component';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { EmployeeService } from '../Service/employee.service';
import { OnboardEmployeeComponent } from '../dialog/onboard-employee/onboard-employee.component';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss'],
})
export class EmployeeManagementComponent implements OnInit, OnDestroy {
  employees: any = [];
  empDOJ;
  // @ViewChild(MatPaginator, { static: false })
  // set paginator(value: MatPaginator) {
  //   if (this.dataSource) {
  //     this.dataSource.paginator = value;
  //   }
  // }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(
    this.employees
  );

  constructor(
    public employeeService: EmployeeService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (res: any) => {
        this.employees = res.data;
        this.dataSource = new MatTableDataSource(this.employees);
        this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator
  // }

  getClass(empType: string) {
    switch (empType) {
      case 'Full-time':
        return 'bg-success';

      case 'Part-time':
        return 'bg-warning';

      case 'Intern':
        return 'bg-info';

      case 'Contract':
        return 'bg-danger';

      case 'Probation':
        return 'bg-dark';
    }
  }

  handleEditAction(values: any) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      data: {
        action: 'Edit',
        data: values,
      },
      backdropClass: 'blurred',
    };
    const dialogRef = this.dialog.open(EmployeeComponent, dialogConfig);

    this.router.events.subscribe({
      next: () => {
        dialogRef.close();
      },
    });

    dialogRef.componentInstance.onEditEmployee.subscribe({
      next: () => {
        this.getAllEmployees();
      },
    });
  }

  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:
        'Delete ' +
        values?.basicDetails?.firstName +
        ' ' +
        values?.basicDetails?.lastName +
        ' ' +
        'from your Record',
    };

    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    dialogRef.componentInstance.onEmitStatusChange.subscribe({
      next: () => {
        this.deleteEmployee(values?._id);
        dialogRef.close();
      },
    });
  }

  deleteEmployee(id: any) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.getAllEmployees();
      },
    });
  }

  onboardEmployee() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      backdropClass: 'blurred',
    };
    const dialogRef = this.dialog.open(OnboardEmployeeComponent, dialogConfig);
    dialogRef.componentInstance.onAddEmployee.subscribe((response: any) => {
      this.getAllEmployees();
    });
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
