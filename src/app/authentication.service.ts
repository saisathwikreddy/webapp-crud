import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { user } from './model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  name:string='';
  password:string='';
  private currentUserSubject: BehaviorSubject<user>;
  public currentUser: Observable<user>;
  loginuser:any;

  constructor(private http:HttpClient,private router: Router) {
    this.currentUserSubject = new BehaviorSubject<user>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): user {
    return this.currentUserSubject.value;
}
  

  loginUser(name:string,password:string){//adds new data to db
    this.http.post("http://localhost:3000/login",{"name":name,"password":password})
    .subscribe(
      (data)=>{
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.loginuser=data;
        if(this.loginuser)
        this.router.navigate(['home']);
      }
    );
  }

  logout(){
    localStorage.removeItem('currentUser');
  }
}
