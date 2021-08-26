import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  edituserForm=this.fb.group({
    id:[null,Validators.required],
    name:[null,Validators.required],
    job:[null,Validators.required]
  })
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<EditUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService ) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    
  }
  updateData(){
    this.dataService.putData(this.edituserForm.value.id,this.edituserForm.value.name,this.edituserForm.value.job);
  }
}
