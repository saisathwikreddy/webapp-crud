import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AddUserComponent } from '../add-user/add-user.component';
import { DataService } from '../services/data.service';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit,OnInit {
  // sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;
  // paginator: MatPaginator | undefined;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'job', 'actions'];
  isUser=false;

  constructor(public dialogService: MatDialog,
    public dataService: DataService, public authenticate:AuthenticationService) {
    this.dataSource = new DataTableDataSource();
  }
  ngOnInit(): void {
    this.dataService.callServer()
    if(this.authenticate.currentUserValue.name!="admin") this.isUser=true;
    console.log(this.isUser);
  }
  
  openAddForm() {
    const dialogRef = this.dialogService.open(AddUserComponent, {
      data: { user: {} }
    });
  }
  startEdit(id: number, name: string, job: string) {
    const dialogRef = this.dialogService.open(EditUserComponent, {
      data: { id: id, name: name, job: job }
    });
  }
  delete(id: number, name: string, job: string) {
    const dialogRef = this.dialogService.open(DeleteUserComponent, {
      data: { id: id, name: name, job: job }
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  
}

