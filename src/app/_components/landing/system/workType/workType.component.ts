import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { WorkTypeService } from 'src/app/_services/system/workType.service';
import { WorkType } from 'src/app/_models/WorkType';

@Component({
  selector: 'app-workType',
  templateUrl: './workType.component.html',
  styleUrls: ['./workType.component.css'],
  providers: [MessageService]
})

export class WorkTypeComponent implements OnInit {

  workTypes: WorkType[];
  displayDialog: boolean;
  selectedWorkType: WorkType;
  newWorkType: boolean;
  cols: any[];
  workType: WorkType;
  msgs: Message[] = [];

  constructor(private workTypeService: WorkTypeService, private messageService: MessageService) {

  }

  ngOnInit() {
    this.getWorkTypeList();
    this.cols = [
      { field: 'workTypeCode', header: 'Work Type Code' },
      { field: 'workTypeDescription', header: 'Work Type Description' }
    ];
  }

  getWorkTypeList() {
    this.workTypeService.getWorkTypeList().subscribe(
      data => {
        this.workTypes = data;
      }
    )
  }
  showDialogToAdd() {
    this.newWorkType = true;
    this.workType = new WorkType();
    this.displayDialog = true;
  }
  save() {
    let workTypes = [...this.workTypes];
    if (this.newWorkType) {
      this.workTypeService.postWorkType(this.workType).subscribe(response => {
        workTypes.push(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Work type saved successfully' });
      });
    }
    else {
      this.workTypeService.putWorkType(this.workType).subscribe(response => {
        workTypes[this.workTypes.indexOf(this.selectedWorkType)] = response;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Work type updated successfully' });
      });
    }
    this.workTypes = workTypes;
    this.workType = null;
    this.displayDialog = false;
  }

  delete() {
    if (!this.selectedWorkType) {
      return;
    }
    this.workTypeService.deleteWorkType(this.selectedWorkType.id).subscribe(respose => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Work type deleted successfully' });
    });
    let index = this.workTypes.indexOf(this.selectedWorkType);
    this.workTypes = this.workTypes.filter((val, i) => i != index);
    this.workType = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newWorkType = false;
    this.workType = this.cloneWorkType(event.data);
    this.displayDialog = true;
  }

  cloneWorkType(e: WorkType): WorkType {
    let workType = {};
    for (let prop in e) {
      workType[prop] = e[prop];
    }
    return e;
  }
}
