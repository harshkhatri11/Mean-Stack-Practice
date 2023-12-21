import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-authentication',
  templateUrl: './user-authentication.component.html',
  styleUrl: './user-authentication.component.scss',
})
export class UserAuthenticationComponent implements OnInit {
  showActiveClass: boolean = false;
  isLoading = false;
  loginForm : any = FormGroup;
  signupForm: any = FormGroup;
  private authStatusSub: Subscription;

  constructor(private formbuilder : FormBuilder, public authService:AuthService){
  }
  ngOnInit(): void {

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus=>{
        this.isLoading = false;
      }
    );

    this.loginForm = this.formbuilder.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,Validators.required]
    })

    this.signupForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  onLogin(){
    this.isLoading = true;
    this.authService.login(this.loginForm.value.email,this.loginForm.value.password);
    this.loginForm.reset();
  }

  onSignup() {
    //this.isLoading = true;
    this.authService.createUser(this.signupForm.value.email, this.signupForm.value.password);
    this.signupForm.reset();
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
