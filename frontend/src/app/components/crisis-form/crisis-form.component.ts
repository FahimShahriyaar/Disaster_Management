import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreService } from '../../services/store.service';

declare var FormData
@Component({
  selector: 'comp-crisis-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crisis-form.component.html',
  styleUrl: './crisis-form.component.css'
})
export class CrisisFormComponent {

  store=inject(StoreService)

  crisis_form: FormGroup
  selectedFile: File | null = null;

  ngOnInit() {
    this.crisis_form = new FormGroup({
      title: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      population: new FormControl(null, [Validators.required]),
      affected: new FormControl(null, Validators.required),
      severity: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })


  }

  // onFileSelect(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.selectedFile = input.files[0];
  //   }
  // }

  formSubmit() {
    if (!this.crisis_form.valid) {
      alert('Please fill out the form correctly.');
      return;
    }

    // const fm=new FormData()
    // formData.append('title', this.crisis_form.get('title')?.value);
    // formData.append('location', this.crisis_form.get('location')?.value);
    // formData.append('population', this.crisis_form.get('population')?.value);
    // formData.append('affected', this.crisis_form.get('affected')?.value);
    // formData.append('severity', this.crisis_form.get('severity')?.value);
    // formData.append('description', this.crisis_form.get('description')?.value);
    // formData.append('date', this.crisis_form.get('date')?.value);
    // formData.append('image', this.selectedFile);

    this.store.CrisisCreate(this.crisis_form.value).subscribe(res=>{
      console.log(res)
      if(res.success){
        alert('crisis will be added after admin approval')
        location.reload()
      }
  })
  }
}
