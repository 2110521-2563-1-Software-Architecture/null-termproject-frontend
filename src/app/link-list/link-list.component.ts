import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { API_URL } from 'src/config';
import ShortUrl from 'src/models/short-url';
import { ShorturlService } from 'src/services/shorturl.service';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss']
})
export class LinkListComponent implements OnInit {

  myUrls?: ShortUrl[];
  API_URL: string;

  @Output()
  linkClick = new EventEmitter<string>();

  constructor(
    private shorturlService: ShorturlService,
  ) { }

  ngOnInit(): void {
    this.shorturlService.myUrls.subscribe({
      next: (urls) => this.myUrls = urls,
    })
    this.API_URL = API_URL;
    this.shorturlService.getMyUrls();
  }

  onLinkClick(id: string) {
    this.linkClick.emit(id);
  }

}
