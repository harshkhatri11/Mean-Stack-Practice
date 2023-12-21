import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  signupForm: any = FormGroup;
  private authStatusSub: Subscription;

  constructor(
    private formbuilder: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit() {

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus=>{
        this.isLoading = false;
      }
    );

    this.signupForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
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
