import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
  ) { }

  currentUser?: string = null;
    
  ngOnInit(): void {
    this.authService.currentUser.subscribe({
      next: val => {
        this.currentUser = val.username;
      }
    })
  }

  onLogout() {
    this.authService.logout();
  }

}
