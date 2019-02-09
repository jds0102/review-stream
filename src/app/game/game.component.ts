import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../review.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IosGame } from '../classes/iosGame';
import { Review } from '../classes/review';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit { 

  @Input() game: any;
  
  private iosGame: IosGame;

  private loaded: boolean = false;

  private reviews: Review[] = [];

  constructor(private reviewService: ReviewService, private http: HttpClient) { }

  ngOnInit() {
    // We should probably find the equivilant Android api to get at the very least the avg rating on the Play store
    let iosInfourl = `https://itunes.apple.com/lookup?id=${this.game.appleId}`;
    
    this.http.jsonp(iosInfourl, 'callback').subscribe(data => {
        this.iosGame = new IosGame(data['results'][0])
        this.loaded = true;
      })

    this.reviewService.getAllReviews(this.game.appleId, this.game.googleId).subscribe(reviews => {
      this.reviews = reviews;
    });

  }

}
