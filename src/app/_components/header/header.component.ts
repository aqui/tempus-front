import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public username: string;

  constructor(public authService: AuthService, private actRoute: ActivatedRoute) {
    
  }
  
  logout() {
    this.authService.doLogout()
  }
  
  ngOnInit(): void {
    
  }

}
