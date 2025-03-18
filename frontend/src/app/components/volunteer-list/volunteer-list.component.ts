import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { CrisisAssignComponent } from '../../modals/crisis-assign/crisis-assign.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'comp-volunteer-list',
  imports: [CommonModule,DatePipe],
  templateUrl: './volunteer-list.component.html',
  styleUrl: './volunteer-list.component.css'
})
export class VolunteerListComponent {
  route=inject(ActivatedRoute)
  store=inject(StoreService)
  Columns: string[] = ['id','name','age','email','phone','status','task'];
  records=null
  page_count=null
  selectedRow:number|null=null
  selectedPage=1
  limit=10
  routeRole=null

  ngOnInit(){
    this.fetchVolunteerList(1,this.limit,'')

    this.route.parent?.url.subscribe(res=>this.routeRole=res[0].path)
  }

  toggleExpandRow(value){
    this.selectedRow=this.selectedRow==value?null:value
  }

  changePage(value){
    this.selectedPage=value
    this.fetchVolunteerList(value,this.limit,'')
  }

  fetchVolunteerList(page,limit,filter){
    this.store.VolunteersListPartial(page,limit,filter).subscribe(res=>{
      this.records=res.data
      this.page_count=Array(res.totalPages)
    })
  }

  openModal(id){
    this.store.crisis_modal.set(true)
    this.store.selected_volunteer.set(id)
  }

  filterList(event){
    this.fetchVolunteerList(1,this.limit,event.target.value)
  }

}
