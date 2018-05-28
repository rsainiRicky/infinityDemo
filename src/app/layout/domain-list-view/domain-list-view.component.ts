import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-domain-list-view',
  templateUrl: './domain-list-view.component.html',
  styleUrls: ['./domain-list-view.component.css']
})
export class DomainListViewComponent implements OnInit {
  @Input() interfaces = [];
  @Input() canView = true;
  @Output() removeDomain: EventEmitter<any> = new EventEmitter<any>();
  @Output() domainDetail: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateDomain: EventEmitter<any> = new EventEmitter<any>();
  editMode = false;
  selectedIndex;
  selectedInterface;
  currentInterface;
  interfaceLength = 0;

  constructor() { }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(change: SimpleChanges) {
    if (change.interfaces !== null || change.interfaces !== undefined) {
      this.interfaceLength = Object.keys(change.interfaces.currentValue).length;
    }
  }
  removeInterface(selectedDomain) {
    this.removeDomain.emit(selectedDomain);
  }

  openModal(domain) {
    this.domainDetail.emit(domain);
  }

  ChangeMode(index, selectedDomain) {
    if (this.editMode === false) {
      this.editMode = true;
      this.selectedIndex = index;
      this.selectedInterface = selectedDomain;
      this.currentInterface = {
        'interface_name': this.selectedInterface['interface_name'],
        'interface_ip': this.selectedInterface['interface_ip']
      };
      localStorage.setItem('toChange', JSON.stringify(this.currentInterface));
    } else {
      this.interfaces.splice(this.selectedIndex, 1, this.currentInterface);
      this.updateDomain.emit({ 'interface': this.interfaces, 'changedInterface': this.currentInterface, 'index': this.selectedIndex });
      this.editMode = false;
      this.selectedIndex = '';
    }
  }

  validate(event, name) {
    if (name === 'domain') {
      this.currentInterface.interface_name = event.target.innerHTML;
    } else {
      this.currentInterface.interface_ip = event.target.innerHTML;
    }
  }
}
