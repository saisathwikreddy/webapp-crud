import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  id:number=0;
  name:string="";
  items:any = []
  job:string="";
  constructor(private http:HttpClient) { }
 
  callServer()//gets all data from server
  {
    this.http.get("http://localhost:3000")
    .subscribe(
      (data)=>{
      this.items=data;
      // console.log(this.items);
    }
      );
      console.log(this.items);
      return this.items;
    }
 
    postData(id:number,name:string,job:string)//adds new data to db
    {
      this.http.post("http://localhost:3000",{"id":id,"name":name,"job":job})
      .subscribe(
        (data)=>{alert("Success");
        this.callServer();}
      );
    }
    putData(id:number,name:string,job:string){
      this.http.put(`http://localhost:3000/${id}`,{"id":id,"name":name,"job":job})
      .subscribe(
        (data)=>{
          alert("Success");
        this.callServer();
        }
      );
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