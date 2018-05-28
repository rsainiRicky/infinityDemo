import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { FormControl, FormGroup, Validators, AbstractControlDirective, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-add-domain-view',
  templateUrl: './add-domain-view.component.html',
  styleUrls: ['./add-domain-view.component.css']
})
export class AddDomainViewComponent implements OnInit {
  @Output() formsubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() domainValidation = true;
  addInterfaceForm: FormGroup;
  domainRegex = new RegExp('(((http|https)\:\/\/)|(www)){1}[a-zA-Z0-9\.\/\?\:@\-_=#]+\.([a-zA-Z0-9\&\.\/\?\:@\-_=#])*');
  ipRegex = new RegExp('(?<=[^0-9.]|^)[1-2][0-9]{0,2}(\.([0-9]{0,3})){3}(?=[^0-9.]|$)');
  isURLValid = true;
  isIpValid = true;

  ngOnInit() {
    this.addInterfaceForm = new FormGroup({
      interface_name: new FormControl('', [Validators.required]),
      interface_ip: new FormControl('', [Validators.required])
    });

  }

  isValid(type: string) {
    switch (type) {
      case 'domain':
        if (this.domainValidation) {
          this.domainRegex.test(this.addInterfaceForm.value['interface_name']) === false ?
            this.isURLValid = false : this.isURLValid = true;
        } else {
          (this.addInterfaceForm.value['interface_name'] === null ||
            this.addInterfaceForm.value['interface_name'] === '' ||
            this.addInterfaceForm.value['interface_name'] === undefined)
            ? this.isURLValid = false : this.isURLValid = true;
        }
        break;
      case 'ip':
        this.ipRegex.test(this.addInterfaceForm.value['interface_ip']) === false ? this.isIpValid = false : this.isIpValid = true;
        break;
      default:
        break;
    }
  }

  submit() {
    if (this.isIpValid && this.isURLValid) {
      if (this.addInterfaceForm.invalid) {
        return;
      } else {
        this.formsubmit.emit(this.addInterfaceForm.value);
        this.addInterfaceForm.reset();
      }
    }
  }


}
