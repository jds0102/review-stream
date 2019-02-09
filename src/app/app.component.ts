import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './classes/authConfig'
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  games = [
    { appleId: '359917414', googleId: 'com.mobilityware.solitaire', name: 'Solitaire' },
    { appleId: '395979574', googleId: 'com.mobilityware.spider', name: 'Spider' },
    { appleId: '301987699', googleId: 'com.mobilityware.spider', name: 'Freecell' },
    { appleId: '309409628', googleId: 'com.mobilityware.spider', name: 'Pyramid Free' },
    { appleId: '949295212', googleId: 'com.mobilityware.spider', name: 'Tri Peaks Free' },
    { appleId: '1275760266', googleId: 'com.mobilityware.spider', name: 'Crown Solitaire' },
    { appleId: '1382466301', googleId: 'com.mobilityware.spider', name: 'Castle Solitaire' },
    { appleId: '1392685721', googleId: 'com.mobilityware.spider', name: 'Spider Go' },
  ];

  constructor(private oauthService: OAuthService) {
    this.configureWithNewConfigApi();
  }

  public login() {
    if (authConfig.clientId === null) {
      alert ('To enable real google data put your google app client id in "classes/authConfig.ts"');
      //Also you will need to edit the review service to remove the fake google data
    } else {
      this.oauthService.initImplicitFlow();
    }
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
   
  }
}