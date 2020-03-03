import { Component } from '@angular/core';
import { Company } from 'src/app/_models/company';
import { CompanyService } from 'src/app/_services/system/company.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [MessageService]
})

export class CompanyComponent {

  constructor(public companyService: CompanyService, private messageService: MessageService) {
    this.companyService.getCompany().subscribe(res => {
      this.company = res._embedded.companies[0];
      this.imageUrl = this.imageBaseUrl + this.company.companyLogo + "?" + Date.now();
    });
  }

  public company = new Company;
  uploadedFiles: any[] = [];
  imageBaseUrl: string = "http://localhost:8080/tempus-front-files/companylogo/";
  imageUrl: string;

  onUpload(event) {
    this.companyService.updateCompany(this.company).subscribe((response: Response) => {
      this.imageUrl = this.imageBaseUrl + this.company.companyLogo + "?" + Date.now();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Company info and logo updated' });
    });
  }

  saveCompany(event) {
    this.companyService.updateCompany(this.company).subscribe((response: Response) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Company updated' });
    });
  }
}