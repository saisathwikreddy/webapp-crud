import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Observable,of as observableOf, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddUserComponent } from '../add-user/add-user.component';
import { DataService } from '../data.service';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';

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

  constructor(public dialogService: MatDialog,
    public dataService: DataService) {
    this.dataSource = new DataTableDataSource();
     console.log(this.dataSource)
  }
  ngOnInit(): void {
    this.dataService.callServer()
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

  connect(): Observable<DataTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.dataService.items), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.dataService.items ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {}

  
  private getPagedData(data: DataTableItem[]): DataTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }
  
  private getSortedData(data: DataTableItem[]): DataTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'job': return compare(a.job, b.job, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
