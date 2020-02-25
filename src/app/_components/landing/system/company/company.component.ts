import { HttpClient } from '@angular/common/http';
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
    })
  }

  public company = new Company;
  selectedFile: File;
  msgs: Message[] = [];
  uploadImageData = new FormData();

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.companyService.postImage(this.uploadImageData);
    this.companyService.postImage(this.uploadImageData).subscribe((response: Response) => {
      if (response.status === 200) {
        this.msgs[0] = { severity: 'info', summary: 'Success', detail: 'Image uploaded successfully' };
      } else {
        this.msgs[0] = { severity: 'error', summary: 'Error', detail: 'Image not uploaded successfully' };
      }
    })
  }
}