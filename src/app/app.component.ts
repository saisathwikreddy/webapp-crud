import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-crud';
  currentUser:any;
  constructor(private router: Router,private authentication: AuthenticationService){
    this.authentication.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser);
  }
  logout(){
    this.authentication.logout();
    this.router.navigate(['/login']);
  }
}
