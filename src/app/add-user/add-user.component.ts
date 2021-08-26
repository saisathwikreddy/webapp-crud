import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import { user } from '../model/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
adduserForm=this.fb.group({
  id:[null,Validators.required],
  name:[null,Validators.required],
  job:[null,Validators.required],
  password:[null,Validators.required]
})
constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<AddUserComponent>,
  @Inject(MAT_DIALOG_DATA) public data: user, public dataService: DataService) {}


  ngOnInit(): void {
  }
  onSubmit(): void {
    console.log(this.adduserForm.value);
  }
  addData(){
    this.dataService.postData(this.adduserForm.value.id,this.adduserForm.value.name,this.adduserForm.value.job,this.adduserForm.value.password);
  }
}
