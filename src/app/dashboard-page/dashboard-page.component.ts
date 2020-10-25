import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  isEditMode: boolean = false;
  editId?: string;

  showCreateForm():void{
    console.log('show form');
  }
  constructor(
    private authSerivce: AuthenticationService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.authSerivce.currentUser.subscribe({
      next: (user) => {
        if (user.username == null) {
          this.router.navigate(['/']);
        }
      }
    })
  }

  onLinkListClick(id: string) {
    if (!id) {
      console.log("child back");
      this.isEditMode = false;
    } else {
      console.log("child click", id);
      this.isEditMode = true;
      this.editId = id;
    }
  }

}
