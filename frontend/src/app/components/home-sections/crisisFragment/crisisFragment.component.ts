import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../../services/store.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'crisisFragment',
  imports: [CommonModule,RouterLink],
  templateUrl: './crisisFragment.component.html',
  styleUrl: './crisisFragment.component.css'
})
export class CrisisFragmentComponent {
  router=inject(Router)
  store=inject(StoreService)
  records=[]

  ngOnInit() {
    this.store.CrisiesListPartial(1,5,'unresolved').subscribe(res=>this.records=res.data)
  }

  goto(){
    this.router.navigate(['crisis'])
  }
}
