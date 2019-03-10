import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import * as faker from 'faker';
import { Review, GOOGLE, IOS } from './classes/review';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

let parseString = require('xml2js').parseString;

/**
 * Right now you can load all most recent views for a given app on both iOS and Android using
 * the getAllReviews function. It currently doesn't do any paging or loading for different countries
 */
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient, private oauthService: OAuthService) { }

  public getAllReviews(appleId: string, googleId: string, page: number): Observable<any> {
    const iosReviewObjs = new Observable((observer) => {

      this.getIosReviews(appleId, page).subscribe(xml => {
        parseString(xml, (err, result) => {
          observer.next(result.feed.entry.map(obj => new Review(obj, IOS)))
          observer.complete()
        });
      });
    })
    let googleReviewObjs = this.getGoogleReviews(googleId).pipe(
      map((reviews: Array<any>) => reviews.map(obj => new Review(obj, GOOGLE)))
    );

    const allReviews = new Observable((observer) => {
      //todo add the google reviews back in ...
      // forkJoin([iosReviewObjs, googleReviewObjs]).subscribe((results) => {
      forkJoin([iosReviewObjs]).subscribe((results) => {
        let iosReviews = results[0] as Review[];
        // let googleReviews = results[1] as Review[];
        // let all = iosReviews.concat(googleReviews);
        //Return sorted reverse chronological
        observer.next(iosReviews.sort((a: Review, b: Review) => { return b.date.getTime() - a.date.getTime() }));
        observer.complete();
      });
    })
    return allReviews;
  }
  public getIosReviews(appleId: string, page: number) {
    //we could let people switch which country with the following;
    //https://itunes.apple.com/${countryCode}/rss/... where country code is found here https://affiliate.itunes.apple.com/resources/documentation/linking-to-the-itunes-music-store/#appendix
    let iosReviewUrl = `https://itunes.apple.com/rss/customerreviews/page=${page}/id=${appleId}/sortBy=mostRecent/xml`

    //Load the xml instead of the json here as it provides more data
    return this.http.get(iosReviewUrl, { responseType: 'text' })
  }

  public getGoogleReviews(googleId: string) {

    return of(this.generateFakeGoogleReviews(20));

    /** Once we have the correct google client id in auth config we can switch to getting
     * the reviews from google with this.
      */
    let googleReviewUrl = `https://www.googleapis.com/androidpublisher/v3/applications/${googleId}/reviews`;

    var headers = new HttpHeaders({
      "Authorization": "Bearer " + this.oauthService.getAccessToken()
    });

    return this.http.get(googleReviewUrl, { headers: headers });
  }

  private generateFakeGoogleReviews(count: number): any[] {
    // See below for all the possible fields of a google review, I am just faking the necessary ones here
    let reviews = [];
    while (count > 0) {
      let fakeDate: Date = new Date(faker.date.recent(30));
      reviews.push({
        "reviewId": faker.lorem.word(),
        "authorName": `${faker.name.firstName()} ${faker.name.lastName()}`,
        "comments": [
          {
            "userComment": {
              "text": faker.hacker.phrase(),
              "lastModified": {
                "seconds": Math.floor(fakeDate.getTime() / 1000),
                "nanos": 123
              },
              "starRating": (Math.floor(Math.random() * 6))
            }
          }
        ]
      });
      count--;
    }

    return reviews;
  }
}

/** template of google review
 * const reviews = {
      'reviews': [
        {
          "reviewId": 'fake',
          "authorName": 'fake author',
          "comments": [
            {
              "userComment": {
                "text": 'this is a comment',
                "lastModified": {
                  "seconds": 123123,
                  "nanos": 123
                },
                "starRating": 4,
            //     "reviewerLanguage": string,
            //     "device": string,
            //     "androidOsVersion": integer,
            //     "appVersionCode": integer,
            //     "appVersionName": string,
            //     "thumbsUpCount": integer,
            //     "thumbsDownCount": integer,
            //     "deviceMetadata": {
            //       "productName": string,
            //       "manufacturer": string,
            //       "deviceClass": string,
            //       "screenWidthPx": integer,
            //       "screenHeightPx": integer,
            //       "nativePlatform": string,
            //       "screenDensityDpi": integer,
            //       "glEsVersion": integer,
            //       "cpuModel": string,
            //       "cpuMake": string,
            //       "ramMb": integer
            //     },
            //     "originalText": string
            //   },
            //   "developerComment": {
            //     "text": string,
            //     "lastModified": {
            //       "seconds": long,
            //       "nanos": integer
            //     }
              }
            }
          ]
        }
      ]
    }
 */
