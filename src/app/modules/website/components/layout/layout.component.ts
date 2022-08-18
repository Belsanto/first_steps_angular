import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `<app-nav></app-nav>
  <router-outlet></router-outlet>`,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor() { }


}
