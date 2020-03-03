import { Component, OnInit } from '@angular/core';
import { Duty } from 'src/app/_models/duty';
import { DutyService } from 'src/app/_services/system/duty.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.css'],
  providers: [MessageService]
})

export class DutyComponent implements OnInit {

  duties: Duty[];
  displayDialog: boolean;
  selectedDuty: Duty;
  newDuty: boolean;
  cols: any[];
  duty: Duty;
  msgs: Message[] = [];

  constructor(private dutyService: DutyService, private messageService: MessageService) {

  }

  ngOnInit() {
    this.getDutyList();
    this.cols = [
      { field: 'dutyCode', header: 'Duty Code' },
      { field: 'dutyDescription', header: 'Duty Description' }
    ];
  }

  getDutyList() {
    this.dutyService.getDutyList().subscribe(
      data => {
        this.duties = data;
      }
    )
  }
  showDialogToAdd() {
    this.newDuty = true;
    this.duty = new Duty();
    this.displayDialog = true;
  }
  save() {
    let duties = [...this.duties];
    if (this.newDuty) {
      this.dutyService.postDuty(this.duty).subscribe(response => {
        duties.push(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Duty saved successfully' });
      });
    }
    else {
      this.dutyService.putDuty(this.duty).subscribe(response => {
        duties[this.duties.indexOf(this.selectedDuty)] = response;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Duty updated successfully' });
      });
    }
    this.duties = duties;
    this.duty = null;
    this.displayDialog = false;
  }

  delete() {
    if (!this.selectedDuty) {
      return;
    }
    this.dutyService.deleteDuty(this.selectedDuty.id).subscribe(respose => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Duty deleted successfully' });
    });
    let index = this.duties.indexOf(this.selectedDuty);
    this.duties = this.duties.filter((val, i) => i != index);
    this.duty = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newDuty = false;
    this.duty = this.cloneDuty(event.data);
    this.displayDialog = true;
  }

  cloneDuty(e: Duty): Duty {
    let duty = {};
    for (let prop in e) {
      duty[prop] = e[prop];
    }
    return e;
  }
}
