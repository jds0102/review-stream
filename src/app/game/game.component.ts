import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../review.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IosGame } from '../classes/iosGame';
import { Review } from '../classes/review';

import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit { 

  @Input() game: any;
  @Input() minRating: number;
  
  private iosGame: IosGame;

  private loaded: boolean = false;

  private reviewServicePage: number = 1;
  private reviews: Review[] = [];
  private reviewPage = 0;
  private allReviewsLoaded: boolean = false;

  private reviewsPerPage = 3;
  private visibleReviews: Review[] = [];
  private maxPage = 10;

  constructor(private reviewService: ReviewService, private http: HttpClient) { }


  ngOnInit() {

    // We should probably find the equivilant Android api to get at the very least the avg rating on the Play store
    let iosInfourl = `https://itunes.apple.com/lookup?id=${this.game.appleId}`;
    
    this.http.jsonp(iosInfourl, 'callback').subscribe(data => {
        this.iosGame = new IosGame(data['results'][0])
        this.loaded = true;
      })

    this.resetReviews();
  }

  updateReviews() {
    this.setVisibleReviews(this.reviewPage);
    this.reviewPage++;

    if (this.reviewPage >= this.reviews.length/this.reviewsPerPage) {
      this.resetReviews();
    } else {
      if (!this.allReviewsLoaded) {
        this.loadMoreReviews()
      }
      window.setTimeout(this.updateReviews.bind(this), 10000);
    }
  }

  setVisibleReviews(pageNum: number): void {
    let start = pageNum * this.reviewsPerPage;
    const end = Math.min(start + this.reviewsPerPage, this.reviews.length - 1);
    this.visibleReviews = this.reviews.slice(start, end);
  }

  resetReviews(): void {
    this.allReviewsLoaded = false;
    this.reviewServicePage = 1;
    this.reviewPage = 0;
    this.reviewService.getAllReviews(this.game.appleId, this.game.googleId, this.reviewServicePage).subscribe(reviews => {
      this.reviews = reviews.filter((review: Review) => review.rating >= this.minRating);
      this.reviewServicePage++;
      this.updateReviews();
    });
  }

  loadMoreReviews(): void {
    if (this.reviewServicePage > this.maxPage) {
      this.allReviewsLoaded = true;
      return;
    }
    this.reviewService.getAllReviews(this.game.appleId, this.game.googleId, this.reviewServicePage).subscribe(reviews => {
      this.reviews = this.reviews.concat(reviews.filter((review: Review) => review.rating >= this.minRating))
    }, err => this.allReviewsLoaded = true) ;
    this.reviewServicePage++;
    if (this.reviewServicePage > 10) {
      this.allReviewsLoaded = true;
    }
  }

}
