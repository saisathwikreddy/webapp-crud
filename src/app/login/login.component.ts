import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginuserForm=this.fb.group({
    name:[null,Validators.required],
    password:[null,Validators.required]
  })
  constructor(private fb: FormBuilder,public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    console.log(this.loginuserForm.value);
  }

  login(){
    this.authenticationService.loginUser(this.loginuserForm.value.name,this.loginuserForm.value.password);
  }
}
