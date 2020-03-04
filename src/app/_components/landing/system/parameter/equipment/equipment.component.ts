import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/app/_models/Equipment';
import { EquipmentService } from 'src/app/_services/system/equipment.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css'],
  providers: [MessageService]
})

export class EquipmentComponent implements OnInit {

  equipments: Equipment[];
  displayDialog: boolean;
  selectedEquipment: Equipment;
  newEquipment: boolean;
  cols: any[];
  equipment: Equipment;
  msgs: Message[] = [];

  constructor(private equipmentService: EquipmentService, private messageService: MessageService) {

  }

  ngOnInit() {
    this.getEquipmentList();
    this.cols = [
      { field: 'equipmentCode', header: 'Equipment Code' },
      { field: 'equipmentDescription', header: 'Equipment Description' }
    ];
  }

  getEquipmentList() {
    this.equipmentService.getEquipmentList().subscribe(
      data => {
        this.equipments = data;
      }
    )
  }
  showDialogToAdd() {
    this.newEquipment = true;
    this.equipment = new Equipment();
    this.displayDialog = true;
  }
  save() {
    let equipments = [...this.equipments];
    if (this.newEquipment) {
      this.equipmentService.postEquipment(this.equipment).subscribe(response => {
        equipments.push(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Equipment saved successfully' });
      });
    }
    else {
      this.equipmentService.putEquipment(this.equipment).subscribe(response => {
        equipments[this.equipments.indexOf(this.selectedEquipment)] = response;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Equipment updated successfully' });
      });
    }
    this.equipments = equipments;
    this.equipment = null;
    this.displayDialog = false;
  }

  delete() {
    if (!this.selectedEquipment) {
      return;
    }
    this.equipmentService.deleteEquipment(this.selectedEquipment.id).subscribe(respose => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Equipment deleted successfully' });
    });
    let index = this.equipments.indexOf(this.selectedEquipment);
    this.equipments = this.equipments.filter((val, i) => i != index);
    this.equipment = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newEquipment = false;
    this.equipment = this.cloneEquipment(event.data);
    this.displayDialog = true;
  }

  cloneEquipment(e: Equipment): Equipment {
    let equipment = {};
    for (let prop in e) {
      equipment[prop] = e[prop];
    }
    return e;
  }
}
