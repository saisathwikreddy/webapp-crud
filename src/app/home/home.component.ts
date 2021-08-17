import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id:number=0;
  name:string="";
  flag:number=0;

  constructor(public service:ServiceService) { 
  }

  addData(postForm:NgForm){
    console.log(this.id,this.name);//ngModel working
    this.service.put_or_postData(this.id,this.name,this.flag);
  }

  deleteData(id:number){
    //console.log(item);
    this.service.deleteData(id);
  }
  updateData(item:any){
    this.flag=1;
    this.id=item.id;
    this.name=item.name;
    
  }

  ngOnInit(): void {
    this.service.callServer()
  }

}
