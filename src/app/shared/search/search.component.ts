import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() resultSearch = new EventEmitter<string>();
  @Output() cleanInput = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  search(e) {
    this.resultSearch.emit(e.target.value);
  }

  clear(){
    this.cleanInput.emit([]);
  }

}
