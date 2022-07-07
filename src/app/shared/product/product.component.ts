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
  public productList = [];

  constructor(
    private homeService: HomeService,
    private alertController: AlertController
  ) {
    this.url = environment.apiUrl;
    this.empty = true;
  }

  ngOnInit() {
    const dataStorage = JSON.parse(localStorage.getItem('list'));

    if (dataStorage) {
      for (let item of dataStorage) {
        this.productList.push(item);
      }
    }
  }

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

  async presentAlert(data) {

      const searchProduct = this.productList.find(element => element.codeBarra == data.code_barra);
      let message_alert = 'Producto agregado a mi lista';

      if (searchProduct) {
        message_alert = 'El producto ya esta mi lista';
      }else {
        const params = {
          nameProduct: data.name_product,
          price: data.price,
          codeBarra: data.code_barra,
          image: data.image,
          quantity: 1,
          total: data.price
        };
        this.productList.push(params);
        localStorage.setItem('list', JSON.stringify(this.productList));
      }

    const alert = await this.alertController.create({
      header: data.name_product,
      message: message_alert,
      buttons: ['OK']
    });

    await alert.present();
  }
}
