import { Component, OnInit } from '@angular/core';
import { Holiday } from 'src/app/_models/Holiday';
import { HolidayService } from 'src/app/_services/system/holiday.service';
import { HolidayTypeService } from 'src/app/_services/system/holidayType.service';
import { Message, MessageService } from 'primeng/api';
import { HolidayType } from 'src/app/_models/HolidayType';
import { ExportfileService } from 'src/app/_services/exportfile.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css'],
  providers: [MessageService, ConfirmationService]
})

export class HolidayComponent implements OnInit {

  holidays: Holiday[];
  holidayTypes: HolidayType[];
  msgs: Message[] = [];
  clonedHolidays: { [s: string]: Holiday; } = {};
  holiday: Holiday;
  newHoliday: boolean;
  displayDialog: boolean;

  constructor(private confirmationService: ConfirmationService, private exportfileService: ExportfileService, private holidayService: HolidayService, private holidayTypeService: HolidayTypeService, private messageService: MessageService) {

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

  onRowDelete(holiday: Holiday, index: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.holidayService.deleteHoliday(holiday.id).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record deleted' });
        });
        if (index > -1) {
          this.holidays.splice(index, 1);
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'success', summary: 'Rejected', detail: 'You have rejected' });
      }
  });
  }

  onRowEditInit(holiday: Holiday) {
    this.clonedHolidays[holiday.id] = { ...holiday };
  }

  showDialogToAdd(event) {
    this.newHoliday = true;
    this.holiday = new Holiday();
    this.displayDialog = true;
  }

  saveNewHoliday() {

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

  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.holidays);
        doc.save('primengTable.pdf');
      })
    })
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getHolidays());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "primengTable");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  getHolidays() {
    let holidays = [];
    for (let holiday of this.holidays) {
      holidays.push(holiday);
    }
    return holidays;
  }
}
