import { Component, Input, OnInit } from '@angular/core';
import { environment} from '../../../environments/environment';
import { HomeService } from '../../home/home.service';
import { AlertController } from '@ionic/angular';

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
  public load: boolean;

  constructor(
    private homeService: HomeService,
    private alertController: AlertController
  ) {
    this.url = environment.apiUrl;
    this.empty = true;
  }

  ngOnInit() {}

  productSearch(data) {
    console.log(data);
    this.load = true;

    if (data === '') {
      this.empty = true;
      this.data = [];
      this.load = false;
      return false;
    }

    this.homeService.searchProduct(data).subscribe(next => {
      if (next.length === 0) {
        this.empty = true;
        this.load = false;
      } else {
        this.empty = false;
        this.data = next;
        this.load = false;
      }
    }, error => {
      console.log(error);
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Agregado',
      message: 'El producto se agrego a la lista',
      buttons: ['OK']
    });

    await alert.present();
  }
}
