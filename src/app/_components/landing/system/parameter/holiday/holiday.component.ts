import { Component, OnInit } from '@angular/core';
import { Holiday } from 'src/app/_models/Holiday';
import { HolidayService } from 'src/app/_services/system/holiday.service';
import { HolidayTypeService } from 'src/app/_services/system/holidayType.service';
import { Message, MessageService } from 'primeng/api';
import { HolidayType } from 'src/app/_models/HolidayType';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css'],
  providers: [MessageService]
})

export class HolidayComponent implements OnInit {

  holidays: Holiday[];
  holidayTypes: HolidayType[];
  msgs: Message[] = [];
  clonedHolidays: { [s: string]: Holiday; } = {};
  
  constructor(private holidayService: HolidayService, private holidayTypeService: HolidayTypeService, private messageService: MessageService) {

  }

  ngOnInit() {
    this.getHolidayTypeList();
    this.getHolidayList();
  }

  getHolidayList() {
    this.holidayService.getHolidayList().subscribe(
      holidays => {
        this.holidays = holidays;
        holidays.forEach(holiday => {
          holiday.holidayDate = new Date(holiday.holidayDate);
        });
      }
    )
  }

  getHolidayTypeList() {
    this.holidayTypeService.getHolidayTypeList().subscribe(
      holidayTypes => {
        this.holidayTypes = holidayTypes;
      }
    )
  }

  onRowEditInit(holiday: Holiday) {
    this.clonedHolidays[holiday.id] = { ...holiday };
  }

  onRowEditSave(holiday: Holiday, index: number) {
      delete this.clonedHolidays[holiday.id];
      this.holidayService.putHoliday(holiday).subscribe(response => {
        this.holidays[index] = response;
        this.holidays[index].holidayDate = new Date(this.holidays[index].holidayDate);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Holiday is updated' });
      })
  }

  onRowEditCancel(holiday: Holiday, index: number) {
    this.holidays[index] = this.clonedHolidays[holiday.id];
    delete this.clonedHolidays[holiday.id];
  }
}
