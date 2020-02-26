import { Component } from '@angular/core';
import { Company } from 'src/app/_models/company';
import { CompanyService } from 'src/app/_services/system/company.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent {

  constructor(public companyService: CompanyService) {
    this.companyService.getCompany().subscribe(res => {
      this.company = res._embedded.companies[0];
      this.imageUrl = this.imageBaseUrl + this.company.logo + "?" + Date.now();
    })
  }

  public company = new Company;
  selectedFile: File = null;
  msgs: Message[] = [];
  uploadImageData = new FormData();
  imageBaseUrl: string = "http://localhost:8080/tempus-front-files/companylogo/";
  imageUrl: string;

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if(this.selectedFile != null) {
      this.uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    }
    this.companyService.saveCompany(this.uploadImageData, this.company).subscribe((response: Response) => {
      if (response.status === 200) {
        this.msgs[0] = { severity: 'info', summary: 'Success', detail: 'Updated successfully' };
        this.imageUrl = this.imageBaseUrl + this.company.logo + "?" + Date.now();
        this.uploadImageData = new FormData();
      } 
      else {
        this.msgs[0] = { severity: 'error', summary: 'Error', detail: 'Not updated successfully' };
      }
    });
  }
}