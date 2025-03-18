import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { CrisisAssignComponent } from '../../modals/crisis-assign/crisis-assign.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'page-admin',
  imports: [RouterOutlet,RouterLink,CrisisAssignComponent,CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  store=inject(StoreService)

}