import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit ,OnDestroy{

  isLoading = false;
  loginForm : any = FormGroup;
  private authStatusSub: Subscription;


  constructor(
    private formbuilder : FormBuilder,
    public authService:AuthService

  ){}

  ngOnInit(){
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus=>{
        this.isLoading = false;
      }
    );

    this.loginForm = this.formbuilder.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,Validators.required]
    })
  }

  onLogin(){
    this.isLoading = true;
    this.authService.login(this.loginForm.value.email,this.loginForm.value.password);
    this.loginForm.reset();
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
