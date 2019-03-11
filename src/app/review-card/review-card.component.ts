import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../classes/review';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss'],
  animations: [
    trigger('transition', [
      state('initial', style({
        transform: 'rotateY(0deg)'
      })),
      state('final', style({
        transform: 'rotateY(360deg)'
      })),
      transition('initial=>final', animate('500ms')),
      transition('final=>initial', animate('500ms'))
    ]),
  ]
})
export class ReviewCardComponent implements OnInit {
 
  @Input() review: Review;

  currentState = 'initial';

  constructor() { }

  ngOnInit() {
    window.setTimeout(this.changeState.bind(this), 1);
  }

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

}
