import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public estadoList = ["Nuevo", "Segunda mano"];
  public productForm! : FormGroup;
  public actionBtn: string = 'Guardar';

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    ) {

    }

  ngOnInit(): void {
    this.productForm =  this.formBuilder.group({
      productName: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      comments: new FormControl('', Validators.required),
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['state'].setValue(this.editData.state);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['comments'].setValue(this.editData.comments);
    }
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