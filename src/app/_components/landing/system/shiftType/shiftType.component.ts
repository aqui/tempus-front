import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { ShiftTypeService } from 'src/app/_services/system/shiftType.service';
import { ShiftType } from 'src/app/_models/ShiftType';

@Component({
  selector: 'app-shiftType',
  templateUrl: './shiftType.component.html',
  styleUrls: ['./shiftType.component.css'],
  providers: [MessageService]
})

export class ShiftTypeComponent implements OnInit {

  shiftTypes: ShiftType[];
  displayDialog: boolean;
  selectedShiftType: ShiftType;
  newShiftType: boolean;
  cols: any[];
  shiftType: ShiftType;
  msgs: Message[] = [];

  constructor(private shiftTypeService: ShiftTypeService, private messageService: MessageService) {

  }

  ngOnInit() {
    this.getShiftTypeList();
    this.cols = [
      { field: 'shiftTypeCode', header: 'Shift Type Code' },
      { field: 'shiftTypeDescription', header: 'Shift Type Description' }
    ];
  }

  getShiftTypeList() {
    this.shiftTypeService.getShiftTypeList().subscribe(
      data => {
        this.shiftTypes = data;
      }
    )
  }
  showDialogToAdd() {
    this.newShiftType = true;
    this.shiftType = new ShiftType();
    this.displayDialog = true;
  }
  save() {
    let shiftTypes = [...this.shiftTypes];
    if (this.newShiftType) {
      this.shiftTypeService.postShiftType(this.shiftType).subscribe(response => {
        shiftTypes.push(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Shift type saved successfully' });
      });
    }
    else {
      this.shiftTypeService.putShiftType(this.shiftType).subscribe(response => {
        shiftTypes[this.shiftTypes.indexOf(this.selectedShiftType)] = response;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Shift type updated successfully' });
      });
    }
    this.shiftTypes = shiftTypes;
    this.shiftType = null;
    this.displayDialog = false;
  }

  delete() {
    if (!this.selectedShiftType) {
      return;
    }
    this.shiftTypeService.deleteShiftType(this.selectedShiftType.id).subscribe(respose => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Shift type deleted successfully' });
    });
    let index = this.shiftTypes.indexOf(this.selectedShiftType);
    this.shiftTypes = this.shiftTypes.filter((val, i) => i != index);
    this.shiftType = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newShiftType = false;
    this.shiftType = this.cloneShiftType(event.data);
    this.displayDialog = true;
  }

  cloneShiftType(e: ShiftType): ShiftType {
    let shiftType = {};
    for (let prop in e) {
      shiftType[prop] = e[prop];
    }
    return e;
  }
}
