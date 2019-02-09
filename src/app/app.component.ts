import { OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './classes/authConfig'
import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  

  constructor(
    private oauthService: OAuthService, 
    private route: ActivatedRoute
  ) {
    this.configureWithNewConfigApi();
  }

  ngOnInit() {
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
    // .then(res => {
    //   let token = this.oauthService.getAccessToken();
    //   console.log(res);
    // }
    // );
   
  }
}