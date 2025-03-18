import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FundFragmentComponent } from '../../components/home-sections/fundFragment/fundFragment.component';
import { CrisisFragmentComponent } from '../../components/home-sections/crisisFragment/crisisFragment.component';
import { VolunteerFragmentComponent } from '../../components/home-sections/volunteerFragment/volunteerFragment.component';
@Component({
  selector: 'page-home',
  imports: [FundFragmentComponent,CrisisFragmentComponent,VolunteerFragmentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent{


}
