import {Component, OnInit} from '@angular/core';
import {AssociationService} from '../../core/service/association.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {AssociationCardComponent} from '../../shared/cards/association-card/association-card.component';

@Component({
  selector: 'app-association-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    AssociationCardComponent
  ],
  templateUrl: './association-page.component.html',
  styleUrl: './association-page.component.scss'
})
export class AssociationPageComponent implements OnInit {

  associationService: AssociationService;

  constructor(associationService: AssociationService) {
    this.associationService = associationService;
  }

  ngOnInit() {
    console.log('AssociationPageComponent initialized');
    this.associationService.getAllAssociations();
  }
}
