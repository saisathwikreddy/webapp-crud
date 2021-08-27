import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../service.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id:number=0;
  name:any="";
  job:string="";
  password:string="";
  flag:number=0;
  isUser=false;
  constructor(public service:ServiceService,public authenticate:AuthenticationService) { 
  }

  addData(postForm:NgForm){
    console.log(this.id,this.name);//ngModel working
    this.service.put_or_postData(this.id,this.name,this.job,this.password,this.flag);
  }
//put_or_postData
  deleteData(id:number){
    //console.log(item);
    this.service.deleteData(id);
  }
  updateData(item:any){
    this.flag=1;
    this.id=item.id;
    this.name=item.name;
    this.job=item.job;
    this.password=item.password;
    
  }
  

  ngOnInit(): void {
    //this.service.callServer()
    this.service.callServer()
    if(this.authenticate.currentUserValue.name!="admin") this.isUser=true;
    console.log(this.isUser);
  }

}
