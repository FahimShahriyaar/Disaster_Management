import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'page-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  register_form:FormGroup


  ngOnInit(){
    this.register_form=new FormGroup({
      name:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
      phone:new FormControl(null,[Validators.required]),
      address:new FormControl(null,Validators.required),
      age:new FormControl(null,Validators.required),
      gender:new FormControl('male',Validators.required),
      password:new FormControl(null,Validators.required),
      confirm_password:new FormControl(null,Validators.required),
      role:new FormControl('user',Validators.required)
    })
  }

  store=inject(StoreService)
  router=inject(Router)
  register(){
    if((this.register_form.value.password!=this.register_form.value.confirm_password) || this.register_form.invalid){
      alert('Fill the form correctly')
      return
    }
    this.store.Register(this.register_form.value).subscribe(res=>{
      if(res.success){
        alert('Register Successful')
        this.store.role.set(this.register_form.value.role)
        this.store.profile.set(this.register_form.value.email)
        localStorage.setItem('profile',this.register_form.value.email)
        localStorage.setItem('role',this.register_form.value.role)
        this.router.navigate([''])
      }
    })
  }

}
