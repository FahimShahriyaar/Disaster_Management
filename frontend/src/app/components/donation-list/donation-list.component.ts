import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'comp-donation-list',
  imports: [DatePipe,CommonModule],
  templateUrl: './donation-list.component.html',
  styleUrl: './donation-list.component.css'
})

export class DonationListComponent {
  route=inject(ActivatedRoute)
  store=inject(StoreService)
  Columns: string[] = ['id','name', 'amount', 'date', 'email'];
  records=null
  page_count=null
  selectedRow:number|null=null
  selectedPage=1
  limit=10
  routeRole=null

  toggleExpandRow(value){
    this.selectedRow=this.selectedRow==value?null:value
  }

  changePage(value){
    this.selectedPage=value
    this.fetchDonationList(value,this.limit)
  }

  ngOnInit(){
    this.fetchDonationList(1,this.limit)
    this.route.parent?.url.subscribe(res=>this.routeRole=res[0].path)
  }

  fetchDonationList(page,limit){
    this.store.DonationsListPartial(page,limit).subscribe(res=>{
      this.records=res.data
      this.page_count=Array(res.totalPages)
    })
  }

}
