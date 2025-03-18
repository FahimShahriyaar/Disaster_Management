import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'comp-crisis-list',
  imports: [CommonModule,DatePipe],
  templateUrl: './crisis-list.component.html',
  styleUrl: './crisis-list.component.css'
})
export class CrisisListComponent {

  route=inject(ActivatedRoute)
  store=inject(StoreService)
  Columns: string[] = ['id', 'title', 'severity', 'date', 'location','status'];
  records=null
  page_count=null
  selectedRow:number|null=null
  selectedPage=1
  limit=10
  routeRole=null
  editRow=null

  enableEdit(value){
    this.editRow = value==this.editRow?null:value
  }

  ngOnInit(){
    this.fetchCrisisList(1,this.limit)

    this.route.parent?.url.subscribe(res=>this.routeRole=res[0].path)
}

  changePage(value){
    this.selectedPage=value
    this.fetchCrisisList(value,this.limit)
  }

  fetchCrisisList(page,limit){
    this.store.CrisiesListPartial(page,limit).subscribe(res=>{
      this.records=res.data
      this.page_count=Array(res.totalPages)
    })
  }

  update(ind,...elm){
    this.editRow=null
    const updateData={_id:this.records[ind]._id,severity:elm[0].textContent,status:elm[1].textContent,affected:elm[2].textContent}
    console.log(updateData)
    this.store.CrisisUpdate(updateData).subscribe(res=>{
      if(res.success){
        alert('File Updated')
        location.reload()
      }
    })
  }

  filterList(event){
    this.store.CrisiesListPartial(1,10,event.target.value).subscribe(res=>{
      if(res.success){
        this.records=res.data
        this.page_count=Array(res.totalPages)
      }
    })
  }

  delete(index){
    this.store.CrisisDelete(this.records[index]._id).subscribe(res=>{
      if(res.success){
        alert('approved')
        location.reload()
      }
    })
  }

  approve(index){
    const updateData={_id:this.records[index]._id,status:'unresolved'}
    this.store.CrisisUpdate(updateData).subscribe(res=>{
      console.log(res)
      if(res.success){
        alert('File Updated')
        location.reload()
      }
    })
  }

}
