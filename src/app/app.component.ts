import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'null-termproject-frontend';
  
  constructor(
    private authenService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authenService.autoLogin();
  }

  onTitleClick() {
    this.router.navigate(['/']);
  }
}
