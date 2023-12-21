import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss']
})

export class UserProfileDetailsComponent  implements OnInit{

  userDetails: any = FormGroup;
  content?: string;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    public toster :ToastrService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // this.userDetails = this.formBuilder.group({
    //   name: [null, Validators.required],
    //   dob: [null, Validators.required],
    // });

    // console.log(localStorage.getItem('userId'));


    this.authService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
            this.router.navigate(['/main/forbidden']);
            // this.authService.logout();
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }

//   const container = document.getElementById('container');
// const registerBtn = document.getElementById('register');
// const loginBtn = document.getElementById('login')

// registerBtn.addEventListener('click', () => {
//   container.classList.add('active');
// });

// loginBtn.addEventListener('click', () => {
//   container.classList.remove('active');
// });



  // handleSubmit(){
  //   let formData = this.userDetails.value;
  //   let data = {
  //     name: formData.name,
  //     dob:formData.dob
  //   }
  //   this.http.post(BACKEND_URL +"/userProfileDetails",data).subscribe(response=>{
  //     console.log(response);
  //   },error=>{
  //     console.log(error);

  //   })
  // }

}
