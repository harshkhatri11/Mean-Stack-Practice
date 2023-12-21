import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  userSettingsForm: any = FormGroup;
  showMyVertClass = true;
  themeSelected: string;
  selectedLang:string;
  selectedTheme:string;

  constructor(
    public translate: TranslateService,
    public dialogRef: MatDialogRef<SettingComponent>,
    private formBuilder: FormBuilder
  ){}

  ngOnInit() {

    this.initializeForm();
    // this.selectedLang = 'en';
    // this.selectedLang = '';
    this.themeSelected = 'default';
    if (window.innerWidth <= 768) {
      this.showMyVertClass = false;
    } else {
      this.showMyVertClass = true;
    }

    const currLang = localStorage.getItem("lang");
    this.selectedLang = currLang;
    this.selectedTheme = 'default';

  }

  initializeForm() {
    this.userSettingsForm = this.formBuilder.group({
      language :[null,Validators.required],
      theme : [{value: '', disabled: true}]
    })
  }

  onSubmit(){
    this.translate.use(this.selectedLang);
    localStorage.setItem("lang",this.selectedLang);
    moment.locale(this.selectedLang);
    this.dialogRef.close();
  }
}
