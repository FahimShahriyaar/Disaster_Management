import { Component } from '@angular/core';
import { InventoryFormComponent } from '../../components/inventory-form/inventory-form.component';
import { InventoryListComponent } from '../../components/inventory-list/inventory-list.component';

@Component({
  selector: 'page-inventory',
  imports: [InventoryFormComponent,InventoryListComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

}
