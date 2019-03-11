import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  games: any[] = [];
  minRating: number = 3;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let gameNames = this.route.snapshot.queryParamMap.getAll('games');
    let minRating = this.route.snapshot.queryParamMap.get('minRating');

    if (minRating && !Number.isNaN(parseFloat(minRating))) {
      this.minRating = parseFloat(minRating);
    }

    if (gameNames.length > 0) {
      this.games = AVAILABLE_GAMES.filter(game => gameNames.includes(game.shortName));
    } else {
      this.games = AVAILABLE_GAMES.slice(0,3);
    }
  }

}

const AVAILABLE_GAMES = [
  { shortName: 'solitaire', appleId: '359917414', googleId: 'com.mobilityware.solitaire', name: 'Solitaire' },
  { shortName: 'spider', appleId: '395979574', googleId: 'com.mobilityware.spider', name: 'Spider' },
  { shortName: 'freecell', appleId: '301987699', googleId: 'com.mobilityware.spider', name: 'Freecell' },
  { shortName: 'pyramid', appleId: '309409628', googleId: 'com.mobilityware.spider', name: 'Pyramid Free' },
  { shortName: 'tripeaks', appleId: '949295212', googleId: 'com.mobilityware.spider', name: 'Tri Peaks Free' },
  { shortName: 'crown', appleId: '1275760266', googleId: 'com.mobilityware.spider', name: 'Crown Solitaire' },
  { shortName: 'castle', appleId: '1382466301', googleId: 'com.mobilityware.spider', name: 'Castle Solitaire' },
  { shortName: 'spidergo', appleId: '1392685721', googleId: 'com.mobilityware.spider', name: 'Spider Go' },
];