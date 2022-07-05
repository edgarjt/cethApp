import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() resultSearch = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  search(e) {
    this.resultSearch.emit(e.target.value);
  }

}
