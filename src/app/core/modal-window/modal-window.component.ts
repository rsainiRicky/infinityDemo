import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {
  display = 'none';
  @Input() isOpen;
  @Input() interfaceName;
  @Output() closeModel: EventEmitter<any> = new EventEmitter<any>();
  subDomains = [];
  constructor() { }
  canview = false;
  validation = false;
  ngOnInit() {
    if (JSON.parse(localStorage.getItem(this.interfaceName['interface_name'])) !== null) {
      this.subDomains = JSON.parse(localStorage.getItem(this.interfaceName['interface_name']));
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(change: SimpleChanges) {
    if (change['isOpen'] !== undefined) {
      if (change['isOpen'].currentValue === true) {
        this.openModal();
      } else {
        this.onCloseHandled();
      }
    }
  }
  openModal() {
    this.display = 'block';
  }
  onCloseHandled() {
    this.display = 'none';
    this.isOpen = false;
    this.interfaceName = '';
    this.subDomains = [];
    this.closeModel.emit(this.isOpen);
  }

  addinterface(event) {
    this.subDomains.push(event);
    localStorage.setItem(this.interfaceName['interface_name'], JSON.stringify(this.subDomains));
  }

  removeSubdomain(selectedSubDomain) {
    this.subDomains.splice(this.subDomains.indexOf(selectedSubDomain), 1);
    if (Object.keys(this.subDomains).length < 1) {
      localStorage.removeItem(this.interfaceName['interface_name']);
    } else {
      localStorage.setItem(this.interfaceName['interface_name'], JSON.stringify(this.subDomains));
    }

  }

  updatedomain(event) {
    this.subDomains = event.interface;
    localStorage.setItem(this.interfaceName['interface_name'], JSON.stringify(this.subDomains));
  }
}
