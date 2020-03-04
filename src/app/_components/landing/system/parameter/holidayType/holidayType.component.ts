import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { HolidayTypeService } from 'src/app/_services/system/holidayType.service';
import { HolidayType } from 'src/app/_models/HolidayType';

@Component({
  selector: 'app-holidayType',
  templateUrl: './holidayType.component.html',
  styleUrls: ['./holidayType.component.css'],
  providers: [MessageService]
})

export class HolidayTypeComponent implements OnInit {

  holidayTypes: HolidayType[];
  displayDialog: boolean;
  selectedHolidayType: HolidayType;
  newHolidayType: boolean;
  cols: any[];
  holidayType: HolidayType;
  msgs: Message[] = [];

  constructor(private holidayTypeService: HolidayTypeService, private messageService: MessageService) {

  }

  ngOnInit() {
    this.getHolidayTypeList();
    this.cols = [
      { field: 'holidayTypeCode', header: 'Holiday Type Code' },
      { field: 'holidayTypeDescription', header: 'Holiday Type Description' }
    ];
  }

  getHolidayTypeList() {
    this.holidayTypeService.getHolidayTypeList().subscribe(
      data => {
        this.holidayTypes = data;
      }
    )
  }
  showDialogToAdd() {
    this.newHolidayType = true;
    this.holidayType = new HolidayType();
    this.displayDialog = true;
  }
  save() {
    let holidayTypes = [...this.holidayTypes];
    if (this.newHolidayType) {
      this.holidayTypeService.postHolidayType(this.holidayType).subscribe(response => {
        holidayTypes.push(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Holiday type saved successfully' });
      });
    }
    else {
      this.holidayTypeService.putHolidayType(this.holidayType).subscribe(response => {
        holidayTypes[this.holidayTypes.indexOf(this.selectedHolidayType)] = response;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Holiday type updated successfully' });
      });
    }
    this.holidayTypes = holidayTypes;
    this.holidayType = null;
    this.displayDialog = false;
  }

  delete() {
    if (!this.selectedHolidayType) {
      return;
    }
    this.holidayTypeService.deleteHolidayType(this.selectedHolidayType.id).subscribe(respose => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Holiday type deleted successfully' });
    });
    let index = this.holidayTypes.indexOf(this.selectedHolidayType);
    this.holidayTypes = this.holidayTypes.filter((val, i) => i != index);
    this.holidayType = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newHolidayType = false;
    this.holidayType = this.cloneHolidayType(event.data);
    this.displayDialog = true;
  }

  cloneHolidayType(e: HolidayType): HolidayType {
    let holidayType = {};
    for (let prop in e) {
      holidayType[prop] = e[prop];
    }
    return e;
  }
}
