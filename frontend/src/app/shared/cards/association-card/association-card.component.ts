import {Component, Input} from '@angular/core';
import {IAssociation} from '../../../core/models/IAssociation';

@Component({
  selector: 'app-association-card',
  standalone: true,
  imports: [],
  templateUrl: './association-card.component.html',
  styleUrl: './association-card.component.scss'
})
export class AssociationCardComponent {

  @Input() association!: IAssociation;

}
