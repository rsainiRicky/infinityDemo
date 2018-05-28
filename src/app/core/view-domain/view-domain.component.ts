import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-view-domain',
  templateUrl: './view-domain.component.html',
  styleUrls: ['./view-domain.component.css']
})
export class ViewDomainComponent implements OnInit {
  @Input() interface_list = [];
  interface_name;
  // @Output() open: EventEmitter<any> = new EventEmitter<any>();
  isopen = false;

  constructor() { }

  ngOnInit() {
    this.interface_list = JSON.parse(localStorage.getItem('domainList'));
  }
  removedomain(selectedDomain) {
    this.interface_list.splice(this.interface_list.indexOf(selectedDomain), 1);
    if (Object.keys(this.interface_list).length < 1) {
      localStorage.removeItem('domainList');
    } else {
      localStorage.setItem('domainList', JSON.stringify(this.interface_list));
    }
  }
  openModal(event) {
    this.isopen = true;
    this.interface_name = event;
  }
  isCloseHandled(event) {
    this.isopen = false;
    this.interface_name = '';
  }
  updatedomain(event) {
    localStorage.setItem('domainList', JSON.stringify(event.interface));
    const toChange = JSON.parse(localStorage.getItem('toChange'));

    if (localStorage.getItem(toChange.interface_name) !== null) {
      const item = JSON.parse(localStorage.getItem(toChange.interface_name));
      localStorage.removeItem(toChange.interface_name);
      localStorage.setItem(event.changedInterface.interface_name, JSON.stringify(item));
      localStorage.removeItem('toChange');
    }
  }
}
