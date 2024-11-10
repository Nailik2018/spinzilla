import { Component } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    RouterLink
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  navItems = [
    {label: 'Home', link: '/'},
    {label: 'association', link: '/association'},
    {label: 'Fähigkeiten', link: '/skills'}
  ];
  showMenu = false;

  toggleMenu() {
    let ele: any = document.querySelector('.hamburg');
    if(this.showMenu) {
      ele.classList.remove('checked');
    } else {
      ele.classList.add('checked');
    }
    this.showMenu = !this.showMenu;
  }
}
