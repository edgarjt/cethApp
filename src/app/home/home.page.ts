import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public data: any;

  constructor(
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.homeService.getUsersVendors().subscribe(next => {
      this.data = next;
    }, error => {
      console.log(error);
    });
  }

}
