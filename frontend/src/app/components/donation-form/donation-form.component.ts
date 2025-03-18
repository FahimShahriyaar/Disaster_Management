import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'comp-donation-form',
  imports: [ReactiveFormsModule],
  templateUrl: './donation-form.component.html',
  styleUrl: './donation-form.component.css'
})
export class DonationFormComponent {

donation_form:FormGroup


ngOnInit(){
  this.donation_form=new FormGroup({
    name:new FormControl(null,Validators.required),
    email:new FormControl(null,[Validators.required,Validators.email]),
    phone:new FormControl(null,[Validators.required]),
    address:new FormControl(null,Validators.required),
    payment_method:new FormControl(null,Validators.required),
    amount:new FormControl(null,[Validators.required,Validators.min(100)]),
    transaction_id:new FormControl(null,Validators.required),
    donation_type:new FormControl(null,Validators.required),
  })
}

store=inject(StoreService)
formSubmit(){
  if(this.donation_form.invalid){
    alert('Fill the full box')
    return
  }
  this.store.DonationCreate(this.donation_form.value).subscribe(res=>{
    console.log(res)
    if(res.success){
      alert('Donated Succesfully')
      location.reload()
    }
  })
  }
}
