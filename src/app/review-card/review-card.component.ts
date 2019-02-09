import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../classes/review';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnInit {
 
  /**
   * author: [{…}]
content: (2) [{…}, {…}]
id: ["3353379321"]
im:contentType: [{…}]
im:rating: ["5"]
im:version: ["3.4.0"]
im:voteCount: ["1"]
im:voteSum: ["0"]
link: [{…}]
title: ["New stuff"]
updated: ["2018-10-28T03:38:40-07:00"]
   */
  @Input() review: Review;

  constructor() { }

  ngOnInit() {
  }

}
