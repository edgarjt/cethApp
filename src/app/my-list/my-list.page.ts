import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.page.html',
  styleUrls: ['./my-list.page.scss'],
})
export class MyListPage implements OnInit {
  products = [];
  url: string;
  message: string;
  phone: string;
  conversation: string;

  constructor(public toastController: ToastController) {
    this.url = environment.apiUrl;
    this.phone = environment.phone;
    this.conversation = environment.conversation;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    const products = JSON.parse(localStorage.getItem('list'));

    if (products) {
      this.products = products;
    }
  }

  cleanList() {
    this.products = [];
    localStorage.removeItem('list');
  }

  deleteProduct(key) {
    this.products.splice(key, 1);
    localStorage.setItem('list', JSON.stringify(this.products));
  }

  getProductList() {
    if (this.products) {
      let message = '';

      for (let item of this.products) {
        message += '-> ' + item.quantity + ' ' + item.nameProduct + ' %0D%0A';
      }
      return message;
    }
  }

  addQuantity(item) {
    if (item.quantity === item.available) {
      this.presentToast('La cantidad sobrepasa la existencia', 'danger');
      return false;
    }

    item.quantity++;
    item.total = item.quantity * item.price;
    localStorage.setItem('list', JSON.stringify(this.products));
  }

  removeQuantity(item) {
    if (item.quantity === 1) {
      return false;
    }

    item.quantity--;
    item.total = item.total - item.price;
    localStorage.setItem('list', JSON.stringify(this.products));
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.getProducts();
    }, 2000);
  }

  getTotal() {
    return this.products.map((t: any) => t).reduce((acc: number, value: any) => acc + parseFloat(value.total), 0);
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}
