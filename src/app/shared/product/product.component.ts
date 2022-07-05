import { Component, Input, OnInit } from '@angular/core';
import { environment} from '../../../environments/environment';
import { HomeService } from '../../home/home.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: string;
  public data: any;
  public url: string;
  public empty: boolean;

  constructor(private homeService: HomeService) {
    this.url = environment.apiUrl;
    this.empty = true;
  }

  ngOnInit() {}

  productSearch(data) {
    if (data === '') {
      return false;
    }

    this.homeService.searchProduct(data).subscribe(next => {
      console.log(next.length);
      if (next.length === 0) {
        this.empty = true;
      } else {
        this.empty = false;
        this.data = next;
      }
    }, error => {
      console.log(error);
    });
  }
}
