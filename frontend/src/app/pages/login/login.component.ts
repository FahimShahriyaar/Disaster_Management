import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'page-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  store=inject(StoreService)
  router=inject(Router)
  location=inject(Location)
  login_form:FormGroup

  ngOnInit(){
    this.login_form=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,Validators.required),
      role:new FormControl('user',Validators.required)
    })
  }

  formSubmit(){
    this.store.Login(this.login_form.value).subscribe(res=>{
      if(res.success) {
        this.store.role.set(this.login_form.value.role)
        this.store.profile.set(this.login_form.value.email)
        localStorage.setItem('profile',this.login_form.value.email)
        localStorage.setItem('role',this.login_form.value.role)
        this.location.back()
      }
      else{
        alert(res.msg)
      }

    })
  }
}
