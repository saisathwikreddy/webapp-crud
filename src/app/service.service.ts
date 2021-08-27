import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  
  id:number=0;
  name:string="";
  password:string="";
  items:any = []
  flag:number=0;
  constructor(private http:HttpClient) { }


  callServer()//gets all data from server
  {
    this.http.get("http://localhost:3000")
    .subscribe(
      (data)=>{console.log(data);
      this.items=data;
    }
      );
    }

    put_or_postData(id:number,name:string,job:string,password:string,flag:number)//adds new data to db
    {if(flag){
      this.flag=0;
      this.http.put(`http://localhost:3000/${id}`,{"id":id,"name":name,"job":job,"password":password})
      .subscribe(
        (data)=>{
          
          alert("Success");
        this.callServer();
        }
      );}
      else{this.http.post("http://localhost:3000",{"id":id,"name":name,"job":job,"password":password})
      .subscribe(
        (data)=>{alert("Success");
        this.callServer();}
      );
    }
    
  }
  
    deleteData(id:number)
    {
      this.http.delete(`http://localhost:3000/${id}`,)
      .subscribe(
        (data)=>
          {
          alert("deleted")
          this.callServer();
          }
      );
    }
    
  
}
