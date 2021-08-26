import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { user } from '../model/user';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  id: number;
  name: string;
  job: string;
}

// TODO: replace this with real data from your application
// let EXAMPLE_DATA: DataTableItem[] = [
//   {id: 1, name: 'Hydrogen', job:'elements'},
//   {id: 2, name: 'Helium', job:'elements'},
//   {id: 3, name: 'Lithium', job:'elements'},
//   {id: 4, name: 'Beryllium', job:'elements'},
//   {id: 5, name: 'Boron', job:'elements'},
//   {id: 6, name: 'Carbon', job:'elements'},
//   {id: 7, name: 'Nitrogen', job:'elements'},
//   {id: 8, name: 'Oxygen', job:'elements'},
//   {id: 9, name: 'Fluorine', job:'elements'},
//   {id: 10, name: 'Neon', job:'elements'},
//   {id: 11, name: 'Sodium', job:'elements'},
//   {id: 12, name: 'Magnesium', job:'elements'},
//   {id: 13, name: 'Aluminum', job:'elements'},
//   {id: 14, name: 'Silicon', job:'elements'},
//   {id: 15, name: 'Phosphorus', job:'elements'},
//   {id: 16, name: 'Sulfur', job:'elements'},
//   {id: 17, name: 'Chlorine', job:'elements'},
//   {id: 18, name: 'Argon', job:'elements'},
//   {id: 19, name: 'Potassium', job:'elements'},
//   {id: 20, name: 'Calcium', job:'elements'},
// ];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  EXAMPLE_DATA:DataTableItem[]=[]
  data: DataTableItem[] = this.EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]): DataTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
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

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
