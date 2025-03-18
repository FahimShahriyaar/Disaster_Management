import { Component, EventEmitter, inject, Output } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Location } from '@angular/common';

@Component({
  selector: 'modal-crisis-assign',
  imports: [],
  templateUrl: './crisis-assign.component.html',
  styleUrl: './crisis-assign.component.css'
})
export class CrisisAssignComponent {

  Columns=['id','title','severity','status']
  success=false
  store=inject(StoreService)
  records=null
  selectedRow=null

  ngOnInit(){
    this.store.CrisiesListPartial(1,20,'unresolved').subscribe(res=>this.records=res.data)
  }

  closeModal(){
    this.store.crisis_modal.set(false)
    this.store.selected_volunteer.set(false)
    if(this.success) location.reload()
  }

  assignTask(id,index){
    this.store.VolunteersTaskAssign({_id:this.store.selected_volunteer(),crisis_id:id}).subscribe(res=>{
      if(res.success){
        console.log(res)
        this.selectedRow=index
        this.success=true
      }
    })
  }
}
