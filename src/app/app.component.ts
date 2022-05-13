import { AfterViewInit, Component, ViewChild, OnInit, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prueba';
  displayedColumns: string[] = ['productName', 'category', 'state', 'price', 'date', 'comments', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private dialog: MatDialog, private api: ApiService) {
  }

  ngOnInit () {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent).afterClosed().subscribe(val=>{
      if (val === 'save'){
        this.getAllProducts();
      }
    });
  }

  getAllProducts () {
    this.api.getProducts().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("error al obtener los datos");
      }
    })
  }

  editProduct (row: any) {
    this.dialog.open(DialogComponent,{
      data: row
    }).afterClosed().subscribe(val=>{
      console.log(val);
      if (val === 'update'){
        this.getAllProducts();
      }
    });
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next:(res)=>{
        alert("producto borrado correctamente");
        this.getAllProducts();
      },
      error:()=>{
        alert("error al borrar el producto");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnchanges () {
    this.getAllProducts();
  }
}
