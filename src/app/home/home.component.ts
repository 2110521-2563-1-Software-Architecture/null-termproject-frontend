import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
  ) { }

  currentUser?: string;

  ngOnInit(): void {
    this.authService.currentUser.subscribe({
      next: user => this.currentUser = user.username,
    })
  }

}
