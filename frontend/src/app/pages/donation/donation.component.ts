import { Component, inject, Input } from '@angular/core';
import { DonationListComponent } from '../../components/donation-list/donation-list.component';
import { DonationFormComponent } from '../../components/donation-form/donation-form.component';
import Chart from 'chart.js/auto'

@Component({
  selector: 'page-donation',
  imports: [DonationListComponent,DonationFormComponent],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {
  data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  // ngOnInit(){
  //   this.loadChart()
  // }

  // loadChart(){
  //   new Chart('barchart', {
  //     type: 'bar',
  //     data: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //       datasets: [{
  //         label: '# of Votes',
  //         data: [12, 19, 3, 5, 2, 3],
  //         backgroundColor: [
  //           'red',
  //           'blue',
  //           'yellow',
  //           'green',
  //           'purple',
  //           'orange',
  //         ],
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }

}
