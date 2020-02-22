import { Component, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      { label: 'Params', icon: 'fa fa-fw fa-bar-chart' },
      { label: 'Holiday', icon: 'fa fa-fw fa-calendar' },
      { label: 'Shift', icon: 'fa fa-fw fa-book' },
      { label: 'Work Template', icon: 'fa fa-fw fa-support' },
      { label: 'Department', icon: 'fa fa-fw fa-twitter' },
      { label: 'Roles', icon: 'fa fa-fw fa-twitter' },
      { label: 'Users', icon: 'fa fa-fw fa-twitter' },
      { label: 'Workers', icon: 'fa fa-fw fa-twitter' },
      { label: 'Product Fam.', icon: 'fa fa-fw fa-twitter' },
      { label: 'Product', icon: 'fa fa-fw fa-twitter' },
      { label: 'Precaution', icon: 'fa fa-fw fa-twitter' },
      { label: 'Company', icon: 'fa fa-fw fa-twitter' }
    ];
  }

}
