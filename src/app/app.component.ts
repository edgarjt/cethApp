import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Productos', url: 'products', icon: 'bag' },
    { title: 'Mi lista', url: 'my-list', icon: 'list' }
  ];
  public labels = ['1.0'];

  constructor() {}
}
