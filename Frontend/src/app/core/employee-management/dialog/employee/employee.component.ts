import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { EmployeeService } from '../../Service/employee.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { COMBO_MAPPING } from 'src/app/shared/constants/combo-constants';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  onEditEmployee = new EventEmitter();
  showMyVertClass = true;
  today = new Date();
  employeeName: string;
  userPersonalDetails: any = FormGroup;
  userProfessionalDetails: any = FormGroup;
  settingControls: any = FormGroup;
  genderList: [] = [];
  employeeStatusList: [] = [];
  employmentTypeList: [] = [];
  designationsList: [] = [];
  departmentList: [] = [];
  rolesList: [] = [];
  @ViewChild('selectDesignation') selectDesignation: NgSelectComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    public employeeService: EmployeeService,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth < 768) {
      this.showMyVertClass = false;
      this.dialogRef.updateSize('80%', '85%');
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1199) {
      this.showMyVertClass = false;
      this.dialogRef.updateSize('80%', 'auto');
    } else {
      this.showMyVertClass = true;
      this.dialogRef.updateSize('70%', 'auto');
    }

    this.initializeForm();
    this.initializeCombos();

    if (this.dialogData.action == 'Edit') {
      const userPersonalData = this.dialogData?.data?.basicDetails;
      this.employeeName =
        userPersonalData.firstName + ' ' + userPersonalData.lastName;
      this.userPersonalDetails.patchValue({
        firstName: userPersonalData?.firstName,
        middleName: userPersonalData?.middleName,
        lastName: userPersonalData?.lastName,
        gender: userPersonalData?.sex,
        phoneNumber: userPersonalData?.phone,
        dateOfBirth: userPersonalData?.dob,
      });

      const userProfessionalData = this.dialogData?.data?.empDetails;
      this.userProfessionalDetails.patchValue({
        departmentName: userProfessionalData?.department,
        designationName: userProfessionalData?.designation,
        dateOfJoining: userProfessionalData?.dateOfJoining,
        employmentType: userProfessionalData?.employeementType,
        employmentStatus: userProfessionalData?.isStatusActive,
      });

      this.settingControls.patchValue({
        role: this.dialogData?.data?.roles[0].name,
      });

      this.commonService
        .getDependentCombo(
          COMBO_MAPPING.DESIGNATION,
          userProfessionalData.department
        )
        .subscribe((res) => {
          this.designationsList = res?.data;
        });
    }
  }

  initializeForm() {
    this.userPersonalDetails = this.formBuilder.group({
      firstName: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      middleName: [null, Validators.pattern(GlobalConstants.nameRegex)],
      lastName: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
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
    });

    this.userProfessionalDetails = this.formBuilder.group({
      departmentName: [null, Validators.required],
      designationName: [null, Validators.required],
      dateOfJoining: [null, Validators.required],
      employmentType: [null, Validators.required],
      employmentStatus: [null, Validators.required],
    });

    this.settingControls = this.formBuilder.group({
      role: [null, Validators.required],
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
      .subscribe((res) => {
        this.designationsList = res?.data;
      });
  }

  submitPersonalDetails() {
    let userPersonalDetailsForm = this.userPersonalDetails.value;
    let personalInfo = {
      id: this.dialogData.data._id,
      firstName: userPersonalDetailsForm.firstName,
      middleName: userPersonalDetailsForm.middleName,
      lastName: userPersonalDetailsForm.lastName,
      gender: userPersonalDetailsForm.gender,
      phoneNumber: userPersonalDetailsForm.phoneNumber,
      dateOfBirth: userPersonalDetailsForm.dateOfBirth,
    };

    this.employeeService.updateEmployeePersonalDetails(personalInfo).subscribe({
      next: (res: any) => {
        this.dialogRef.close();
        this.onEditEmployee.emit();
      },
      error: (err) => {},
    });
  }

  submitProfessionalDetails() {
    let professionalDetailForm = this.userProfessionalDetails.value;
    let professionalInfo = {
      id: this.dialogData.data._id,
      departmentName: professionalDetailForm.departmentName,
      designationName: professionalDetailForm.designationName,
      dateOfJoining: professionalDetailForm.dateOfJoining,
      employmentStatus: professionalDetailForm.employmentStatus,
      employmentType: professionalDetailForm.employmentType,
    };

    this.employeeService
      .updateEmployeeProfessionalData(professionalInfo)
      .subscribe({
        next: (res: any) => {
          this.dialogRef.close();
          this.onEditEmployee.emit();
        },
      });
  }

  submitUserSettingControl() {
    let settingsControlsForm = this.settingControls.value;
    let settingsControlsData = {
      id: this.dialogData.data._id,
      role: settingsControlsForm.role,
    };
    this.employeeService
      .updateEmployeeSettinsControlsData(settingsControlsData)
      .subscribe({
        next: (res: any) => {
          this.dialogRef.close();
          this.onEditEmployee.emit();
        },
      });
  }
}
