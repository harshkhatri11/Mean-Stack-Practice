import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../Service/employee.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { COMBO_MAPPING } from 'src/app/shared/constants/combo-constants';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-onboard-employee',
  templateUrl: './onboard-employee.component.html',
  styleUrls: ['./onboard-employee.component.scss'],
})
export class OnboardEmployeeComponent implements OnInit {
  onboardNewUser: any = FormGroup;
  basicDetails: any = FormGroup;
  professionalDetails: any = FormGroup;
  userCredentials: any = FormGroup;
  userSumary: any;
  isLower: boolean = false;
  isUpper: boolean = false;
  isDigit: boolean = false;
  isSpecialChar: boolean = false;
  isMinlength: boolean = false;
  isPassPolicyCheck: boolean = false;
  isEmailExist: boolean = true;
  today = new Date();
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  genderList: [] = [];
  employeeStatusList: [] = [];
  employmentTypeList: [] = [];
  designationsList: [] = [];
  departmentList: [] = [];
  rolesList: [] = [];
  isPasswordMatch: boolean = false;
  isMobileView: boolean = false;
  onAddEmployee = new EventEmitter();
  @ViewChild('selectDesignation') selectDesignation: NgSelectComponent;
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<OnboardEmployeeComponent>,
    public employeeService: EmployeeService,
    public commonService: CommonService,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null {
    return this.onboardNewUser.get('formArray');
  }

  ngOnInit(): void {
    if (window.innerWidth <= 768) {
      this.dialogRef.updateSize('80%', '85%');
      this.isMobileView = true;
    } else if (window.innerWidth > 768 && window.innerWidth <= 1199) {
      this.isMobileView = false;
      this.dialogRef.updateSize('80%', 'auto');
    } else {
      this.isMobileView = false;
      this.dialogRef.updateSize('65%', 'auto');
    }

    this.initializeForm();
    this.initializeCombos();

    this.previewSummary();
  }

  initializeForm() {
    this.onboardNewUser = this.formBuilder.group({
      formArray: this.formBuilder.array([
        (this.basicDetails = this.formBuilder.group({
          firstName: [
            null,
            [
              Validators.required,
              Validators.pattern(GlobalConstants.nameRegex),
            ],
          ],
          middleName: [null, Validators.pattern(GlobalConstants.nameRegex)],
          lastName: [
            null,
            [
              Validators.required,
              Validators.pattern(GlobalConstants.nameRegex),
            ],
          ],
          gender: [null, Validators.required],
          phoneNumber: [
            null,
            [
              Validators.required,
              Validators.pattern(GlobalConstants.contactNumberRegex),
              Validators.maxLength(10),
            ],
          ],
          dateOfBirth: [null, Validators.required],
        })),
        (this.professionalDetails = this.formBuilder.group({
          departmentName: [null, Validators.required],
          designationName: [null, Validators.required],
          dateOfJoining: [null, Validators.required],
          employmentType: [null, Validators.required],
          employmentStatus: [null, Validators.required],
        })),
        (this.userCredentials = this.formBuilder.group({
          email: [null, [Validators.required, Validators.email]],
          password: [null, [Validators.required]],
          confirmPassword: [null, [Validators.required]],
          role: ['user', Validators.required],
        })),
      ]),
    });
  }

  initializeCombos() {
    this.commonService.getCombo(COMBO_MAPPING.GENDER).subscribe({
      next: (res) => {
        this.genderList = res?.data?.comboData;
      },
    });

    this.commonService.getCombo(COMBO_MAPPING.EMPLOYEESTATUS).subscribe({
      next: (res) => {
        this.employeeStatusList = res?.data?.comboData;
      },
    });

    this.commonService.getCombo(COMBO_MAPPING.EMPLOYMENTTYPE).subscribe({
      next: (res) => {
        this.employmentTypeList = res?.data?.comboData;
      },
    });

    this.commonService.getCombo(COMBO_MAPPING.DEPARTMENT).subscribe({
      next: (res) => {
        this.departmentList = res?.data?.comboData;
      },
    });

    this.commonService.getCombo(COMBO_MAPPING.ROLES).subscribe({
      next: (res) => {
        this.rolesList = res?.data?.comboData;
      },
    });
  }

  onDepartmentChange(departmentName) {
    this.selectDesignation.clearModel();
    this.commonService
      .getDependentCombo(COMBO_MAPPING.DESIGNATION, departmentName)
      .subscribe({
        next: (res) => {
          this.designationsList = res?.data;
        },
      });
  }

  checkEmailExists(val) {
    let data = { email: val };
    if (val.length && this.userCredentials.get('email').valid) {
      this.employeeService.isEmailExist(data).subscribe({
        next: (res: any) => {
          this.isEmailExist = res.data.isEmailExist;
        },
      });
    } else if (this.userCredentials.get('email').invalid) {
      this.isEmailExist = true;
    }
  }

  validatepassword(e: any) {
    if (
      this.userCredentials.controls['password'].value == e &&
      this.userCredentials.controls['confirmPassword'].value == e
    ) {
      this.isPasswordMatch = true;
    } else {
      this.isPasswordMatch = false;
    }
  }

  passPolicyChecker(pass: any) {
    if (pass.match(/[a-z]/)) {
      this.isLower = true;
    } else {
      this.isLower = false;
    }

    if (pass.match(/[A-Z]/)) {
      this.isUpper = true;
    } else {
      this.isUpper = false;
    }

    if (pass.match(/[0-9]/)) {
      this.isDigit = true;
    } else {
      this.isDigit = false;
    }

    if (pass.match(/[@$%^]/)) {
      this.isSpecialChar = true;
    } else {
      this.isSpecialChar = false;
    }

    if (pass.length >= 8) {
      this.isMinlength = true;
    } else {
      this.isMinlength = false;
    }

    if (
      pass.match(/[a-z]/) &&
      pass.match(/[A-Z]/) &&
      pass.match(/[0-9]/) &&
      pass.match(/[@$%!^]/) &&
      pass.length >= 8
    ) {
      this.isPassPolicyCheck = true;
    } else {
      this.isPassPolicyCheck = false;
    }
  }

  previewSummary() {
    this.userSumary = [
      {
        firstName: this.basicDetails.controls['firstName'].value,
        middleName: this.basicDetails.controls['middleName'].value,
        lastName: this.basicDetails.controls['lastName'].value,
        gender: this.basicDetails.controls['gender'].value,
        phoneNumber: this.basicDetails.controls['phoneNumber'].value,
        dateOfBirth: this.basicDetails.controls['dateOfBirth'].value,
        departmentName:
          this.professionalDetails.controls['departmentName'].value,
        designationName:
          this.professionalDetails.controls['designationName'].value,
        dateOfJoining: this.professionalDetails.controls['dateOfJoining'].value,
        employmentType:
          this.professionalDetails.controls['employmentType'].value,
        employmentStatus:
          this.professionalDetails.controls['employmentStatus'].value,
        email: this.userCredentials.controls['email'].value,
        password: this.userCredentials.controls['password'].value,
        role: this.userCredentials.controls['role'].value,
      },
    ];
  }

  onReset() {
    this.onboardNewUser.reset();
    this.isPassPolicyCheck = false;
    this.isPasswordMatch = false;
    this.isEmailExist = true;
    this.userSumary = [];
  }

  onSubmit() {
    let data = this.userSumary[0];
    this.employeeService.onboardEmployee(data).subscribe({
      next: (res: any) => {
        this.dialogRef.close();
        this.onAddEmployee.emit();
      },
    });
  }
}
