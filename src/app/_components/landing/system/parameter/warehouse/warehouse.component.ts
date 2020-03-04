import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/_models/Warehouse';
import { WarehouseService } from 'src/app/_services/system/warehouse.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css'],
  providers: [MessageService]
})

export class WarehouseComponent implements OnInit {

  warehouses: Warehouse[];
  displayDialog: boolean;
  selectedWarehouse: Warehouse;
  newWarehouse: boolean;
  cols: any[];
  warehouse: Warehouse;
  msgs: Message[] = [];

  constructor(private warehouseService: WarehouseService, private messageService: MessageService) {

  }

  ngOnInit() {
    this.getWarehouseList();
    this.cols = [
      { field: 'warehouseCode', header: 'Warehouse Code' },
      { field: 'warehouseDescription', header: 'Warehouse Description' }
    ];
  }

  getWarehouseList() {
    this.warehouseService.getWarehouseList().subscribe(
      data => {
        this.warehouses = data;
      }
    )
  }
  showDialogToAdd() {
    this.newWarehouse = true;
    this.warehouse = new Warehouse();
    this.displayDialog = true;
  }
  save() {
    let warehouses = [...this.warehouses];
    if (this.newWarehouse) {
      this.warehouseService.postWarehouse(this.warehouse).subscribe(response => {
        warehouses.push(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Warehouse saved successfully' });
      });
    }
    else {
      this.warehouseService.putWarehouse(this.warehouse).subscribe(response => {
        warehouses[this.warehouses.indexOf(this.selectedWarehouse)] = response;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Warehouse updated successfully' });
      });
    }
    this.warehouses = warehouses;
    this.warehouse = null;
    this.displayDialog = false;
  }

  delete() {
    if (!this.selectedWarehouse) {
      return;
    }
    this.warehouseService.deleteWarehouse(this.selectedWarehouse.id).subscribe(respose => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Warehouse deleted successfully' });
    });
    let index = this.warehouses.indexOf(this.selectedWarehouse);
    this.warehouses = this.warehouses.filter((val, i) => i != index);
    this.warehouse = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newWarehouse = false;
    this.warehouse = this.cloneWarehouse(event.data);
    this.displayDialog = true;
  }

  cloneWarehouse(e: Warehouse): Warehouse {
    let warehouse = {};
    for (let prop in e) {
      warehouse[prop] = e[prop];
    }
    return e;
  }
}
