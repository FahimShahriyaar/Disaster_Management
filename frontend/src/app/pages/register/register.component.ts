import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

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

  http=inject(HttpClient)
  register(){
    console.log(this.register_form)
    this.http.post('http://localhost:3000/api/account/signup',this.register_form.value).subscribe(res=>console.log(res))
  }
}
