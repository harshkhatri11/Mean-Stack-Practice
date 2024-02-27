import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrl: './pipe.component.scss',
})
export class PipeComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAdminBoard().subscribe();
  }

  searchText: string = '';
  numIndianStandard: number = 150000;
  numGlobalStandard: number = 150000;
  truncateText: string =
    'As designers, we are frequently and incorrectly reminded that our job is to “make things pretty.” We are indeed designers — not artists — and there is no place for formalism in good design. Web design has a function, and that function is to communicate the message for which the Web page was conceived. The medium is not the message.';
  searchedTerm;
  list = [
    { id: 1, name: 'Apple' },
    { id: 1, name: 'Pineapple' },
    { id: 1, name: 'Jackfruit' },
    { id: 1, name: 'Somefruit' },
  ];
}
