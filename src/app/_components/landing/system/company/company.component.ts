import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/_services/system/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/_models/company';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  msgs: Message[] = [];
  public company = new Company;
  endpoint: string = 'http://localhost:8080';
  uploadedFile: any[] = [];

  constructor(private http: HttpClient, public router: Router, private location: Location, public companyService: CompanyService, private actRoute: ActivatedRoute) {
    this.companyService.getCompany().subscribe(res => {
      this.company = res._embedded.companies[0];
    })
  }
  
  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFile[0] = file;
      this.company.logo = this.uploadedFile[0].name;
      this.msgs[0] = { severity: 'info', summary: 'File Upload', detail: 'Success' };
    }
    console.log(this.uploadedFile[0])
    this.http.post<any>(`${this.endpoint}/api/companies`, this.company)
      .subscribe((res: any) => {
        console.log(res);
      })
  }

  ngOnInit(): void {
  }

}
