import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public estadoList = ["Nuevo", "Segunda mano"];
  public productForm! : FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<DialogComponent>, private api: ApiService) { }

  ngOnInit(): void {
    this.productForm =  this.formBuilder.group({
      productName: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      comments: new FormControl('', Validators.required),
    });
  }

  public addProduct (){
    if (this.productForm.valid){
      this.api.postProduct(this.productForm.value).subscribe({
        next:(res)=>{
          alert("producto añadido correctamente");
          this.productForm.reset();
          // this.dialogRef.close('Guardar');
        },
        error: ()=>{
          alert("error al añadir el producto, reviselo e introduzcalo de nuevo");
        }
      });
    }
  }

}