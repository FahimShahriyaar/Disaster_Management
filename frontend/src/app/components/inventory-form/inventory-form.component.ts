import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'inventory-form',
  imports: [ReactiveFormsModule],
  templateUrl: './inventory-form.component.html',
  styleUrl: './inventory-form.component.css'
})
export class InventoryFormComponent {

  store=inject(StoreService)
  inventory_form:FormGroup

  ngOnInit(){
    this.inventory_form=new FormGroup({
          product_name:new FormControl(null,Validators.required),
          price:new FormControl(null,Validators.required),
          quantity:new FormControl(null,Validators.required),
          inventory_type:new FormControl(null,Validators.required)
        })
  }


  formSubmit(){
    if(this.inventory_form.invalid){
      console.log(this.inventory_form)
      alert('Fill all the box')
      return
    }
    this.store.InventoryCreate(this.inventory_form.value).subscribe(res=>{
      if(res.success){
        alert('Product Created')
        location.reload()
      }
    })
  }
}
