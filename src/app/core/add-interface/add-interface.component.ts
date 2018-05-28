import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControlDirective, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-add-interface',
  templateUrl: './add-interface.component.html',
  styleUrls: ['./add-interface.component.css']
})
export class AddIntefaceComponent implements OnInit {
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  domainlist: Array<any> = [];
  isDuplicate = false;
  ngOnInit() { }

  submit(event) {
    if (JSON.parse(localStorage.getItem('domainList')) === null) {
      this.domainlist.push(event);
      localStorage.setItem('domainList', JSON.stringify(this.domainlist));
      this.change.emit(this.domainlist);
    } else {
      this.domainlist = JSON.parse(localStorage.getItem('domainList'));
      this.domainlist.forEach(element => {
        if (element.interface_name === event.interface_name) {
          this.isDuplicate = true;
          return;
        } else {
          this.isDuplicate = false;
          if (this.domainlist.indexOf(element) === Object.keys(this.domainlist).length - 1) {
            this.domainlist.push(event);
            localStorage.setItem('domainList', JSON.stringify(this.domainlist));
            this.change.emit(this.domainlist);
          }
        }
      });

    }
  }
}
