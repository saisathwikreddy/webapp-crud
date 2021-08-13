import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
adduserForm=this.fb.group({
  id:[null,Validators.required],
  name:[null,Validators.required],
  job:[null,Validators.required]
})
constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  }
  onSubmit(): void {
    alert('Thanks!');
  }
}
