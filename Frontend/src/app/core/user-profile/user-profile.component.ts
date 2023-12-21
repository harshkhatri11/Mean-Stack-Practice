import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { GlobalConstants } from 'src/app/shared/global-constants';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { COMBO_MAPPING } from 'src/app/shared/constants/combo-constants';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  onEditUser = new EventEmitter();
  employeeForm: any = FormGroup;
  today = new Date();
  genderList: any;
  avatarImg: string = '';
  userDisplaypName: string;
  userId: any;
  userEmail: string;
  userProfileForm: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    private authService: AuthService,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth < 768) {
      this.dialogRef.updateSize('80%', '85%');
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1199) {
      this.dialogRef.updateSize('90%', 'auto');
    } else {
      this.dialogRef.updateSize('65%', 'auto');
    }

    this.initializeForm();
    this.setUserDetails();

    this.commonService.getCombo(COMBO_MAPPING.GENDER).subscribe((res) => {
      this.genderList = res.data.comboData;
    });
  }

  initializeForm() {
    this.employeeForm = this.formBuilder.group({
      firstName: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      middleName: [null, Validators.pattern(GlobalConstants.nameRegex)],
      lastName: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      dob: [null, Validators.required],
      phone: [
        null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.contactNumberRegex),
        ],
      ],
      gender: [null, Validators.required],
    });
  }

  setUserDetails() {
    this.userProfileForm = this.dialogData.value;
    this.userDisplaypName =
      this.userProfileForm?.basicDetails?.firstName +
      ' ' +
      this.userProfileForm?.basicDetails?.lastName;
    this.userEmail = this.userProfileForm?.email;

    this.employeeForm.patchValue({
      firstName: this.userProfileForm.basicDetails?.firstName,
      middleName: this.userProfileForm.basicDetails?.middleName,
      lastName: this.userProfileForm.basicDetails?.lastName,
      dob: this.userProfileForm.basicDetails?.dob,
      phone: this.userProfileForm.basicDetails?.phone,
      gender: this.userProfileForm.basicDetails?.sex,
    });
  }

  onSubmit() {
    const formData = this.employeeForm.value;
    this.userId = this.authService.getUserId();
    const data = {
      id: this.userId,
      firstName: formData.firstName?.trim(),
      middleName: formData.middleName?.trim(),
      lastName: formData.lastName?.trim(),
      phone: formData.phone?.trim(),
      dob: formData.dob,
      gender: formData.gender,
    };
    this.authService.updateUserDetails(data).subscribe({
      next: () => {
        this.dialogRef.close();
        this.onEditUser.emit();
      },
    });
  }
}
