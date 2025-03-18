import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'volunteerFragment',
  imports: [CommonModule],
  templateUrl: './volunteerFragment.component.html',
  styleUrl: './volunteerFragment.component.css'
})
export class VolunteerFragmentComponent {
  router=inject(Router)
  store=inject(StoreService)
  records=[]

  ngOnInit() {
    this.store.VolunteersListPartial(1,5).subscribe(res=>this.records=res.data)
  }

  goto(){
    this.router.navigate(['volunteer'])
  }
}
