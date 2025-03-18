import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'inventory-list',
  imports: [CommonModule],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent {
  route = inject(ActivatedRoute)
  store = inject(StoreService)
  Columns: string[] = ['id', 'product name', 'price', 'quantity','total','date','inventory type'];
  records = null
  page_count = null
  selectedRow: number | null = null
  selectedPage = 1
  limit = 10
  routeRole = null
  editRow=null

  enableEdit(value){
    this.editRow = value==this.editRow?null:value
  }


  changePage(value) {
    this.selectedPage = value
    this.fetchInventoryList(value, this.limit)
  }

  ngOnInit() {
    this.fetchInventoryList(1, this.limit)

    this.route.parent?.url.subscribe(res => this.routeRole = res[0].path)
  }

  fetchInventoryList(page, limit) {
    this.store.InventoryListPartial(page, limit).subscribe(res => {
      this.records = res.data
      this.page_count = Array(res.totalPages)
    })
  }


  update(ind,...elm){
    this.editRow=null
    const updateData={_id:this.records[ind]._id,product_name:elm[0].textContent,price:elm[1].textContent,quantity:elm[2].textContent, inventory_type:elm[2].textContent}
    console.log(updateData)
    this.store.InventoryUpdate(updateData).subscribe(res=>{
      if(res.success){
        alert('File Updated')
        location.reload()
      }
    })
  }

  filterList(event){
    this.store.InventoryListPartial(1,10,event.target.value).subscribe(res=>{
      if(res.success){
        this.records=res.data
        this.page_count=Array(res.totalPages)
      }
    })
  }

  delete(index){
    this.store.InventoryDelete(this.records[index]._id).subscribe(res=>{
      alert('File Deleted')
      location.reload()
    })
  }
}
