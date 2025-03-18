import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'comp-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  store=inject(StoreService)
  router=inject(Router)

  role=this.store.role
  profile=this.store.profile


  logout(){
    localStorage.clear()
    this.store.profile.set(null)
    this.store.role.set('anonymous')
    this.router.navigate([''])
  }
}
