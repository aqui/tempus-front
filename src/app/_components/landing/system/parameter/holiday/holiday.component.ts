import { Component, OnInit } from '@angular/core';
import { Holiday } from 'src/app/_models/Holiday';
import { HolidayService } from 'src/app/_services/system/holiday.service';
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

  constructor(private holidayService: HolidayService, private messageService: MessageService) {
    this.getHolidayList();
  }

  ngOnInit() {
    
  }

  getHolidayList() {
    this.holidayService.getHolidayList().subscribe(
      holidays => {
        this.holidays = holidays;
      }
    )
  }
}
