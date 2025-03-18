import { Component } from '@angular/core';
import { CrisisListComponent } from "../../components/crisis-list/crisis-list.component";
import { CrisisFormComponent } from '../../components/crisis-form/crisis-form.component';

@Component({
  selector: 'page-crisis',
  imports: [CrisisListComponent, CrisisFormComponent],
  templateUrl: './crisis.component.html',
  styleUrl: './crisis.component.css'
})
export class CrisisComponent {

}
