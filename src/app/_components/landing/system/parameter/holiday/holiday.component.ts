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
  msgs: Message[] = [];
  displayDialog: boolean;
  selectedHoliday: Holiday;
  newHoliday: boolean;
  cols: any[];
  holiday: Holiday;

  constructor(private holidayService: HolidayService, private holidayTypeService: HolidayTypeService, private messageService: MessageService) {
    
  }

  ngOnInit() {
    this.getHolidayList();
  }

  getHolidayList() {
    this.holidayService.getHolidayList().subscribe(
      holidays => {
        this.holidays = holidays;
      }
    )
  }
}
