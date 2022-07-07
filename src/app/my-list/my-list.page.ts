import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.page.html',
  styleUrls: ['./my-list.page.scss'],
})
export class MyListPage implements OnInit {
  products = [];
  url: string;
  message: string;

  constructor() {
    this.url = environment.apiUrl;
  }

  ngOnInit() {
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

  getTotal() {
    return this.products.map((t: any) => t).reduce((acc: number, value: any) => acc + parseFloat(value.total), 0);
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

}
