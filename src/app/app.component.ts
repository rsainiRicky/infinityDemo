import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  domainList = [];

  domainUpdate(event) {
    if (event.srcElement === undefined) {
      this.domainList = event;
    }
  }
}
