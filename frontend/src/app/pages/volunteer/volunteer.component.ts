import { Component } from '@angular/core';
import { VolunteerListComponent } from '../../components/volunteer-list/volunteer-list.component';
import { CrisisListComponent } from '../../components/crisis-list/crisis-list.component';
import { CrisisAssignComponent } from "../../modals/crisis-assign/crisis-assign.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'page-volunteer',
  imports: [VolunteerListComponent, CommonModule],
  templateUrl: './volunteer.component.html',
  styleUrl: './volunteer.component.css'
})
export class VolunteerComponent {

  assignModalEnable=true

}
