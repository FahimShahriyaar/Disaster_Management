import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { StoreService } from '../../../services/store.service';
import { Router } from '@angular/router';


@Component({
  selector: 'fundFragment',
  imports: [],
  templateUrl: './fundFragment.component.html',
  styleUrl: './fundFragment.component.css'
})
export class FundFragmentComponent{
  constructor(private el: ElementRef) {
    Chart.register(...registerables); // Register chart.js components
  }

  router=inject(Router)
  store=inject(StoreService)
  totalFunds = 0;

  xValues = ["Donations", "Expenses"];
  yValues = [0,0];
  barColors = ["red", "green"];


  ngOnInit() {
    this.store.TotalFund().subscribe(res=>{
      this.totalFunds=res.data
    })
  }

  goto(){
    this.router.navigate(['donation'])
  }

// ngAfterViewInit() {
//   const canvas = this.el.nativeElement.querySelector('canvas');
//   new Chart(canvas, {
//     type: 'bar',
//     data: {
//       labels: this.xValues,
//       datasets: [
//         {
//           label: 'Donations',
//           data: this.yValues,
//           backgroundColor: this.barColors,
//         }
//       ]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: 'top',
//         }
//       },
//       scales: {
//         x: {
//           title: { display: true, text: 'Days' },
//         },
//         y: {
//           title: { display: true, text: 'Amount ($)' },
//           beginAtZero: true,
//         }
//       }
//     }
//   });
// }
}
