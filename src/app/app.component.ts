import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Tempus';

  constructor(public authService: AuthService, public router: Router) { 
    if(authService.isLoggedIn)
      this.router.navigate(['landing/']);
  }
  
}
