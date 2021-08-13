import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AddUserComponent } from '../add-user/add-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'job', 'actions'];

  constructor(public dialogService: MatDialog) {
    this.dataSource = new DataTableDataSource();
  }
  openAddForm(){
    const dialogRef = this.dialogService.open(AddUserComponent, {
      data: {user:{}}
    });
  }
  startEdit(i:number,id:number,name:string,job:string){
    const dialogRef = this.dialogService.open(EditUserComponent, {
      data: {id: id, name:name, job:job}
    });
  }
  delete(i:number,id:number,name:string,job:string){
    const dialogRef = this.dialogService.open(DeleteUserComponent, {
      data: {id: id, name:name, job:job}
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
