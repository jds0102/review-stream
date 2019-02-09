import { AuthConfig } from 'angular-oauth2-oidc';

 
export const authConfig: AuthConfig = {
 
  // Url of the Identity Providerssss
  issuer: 'https://accounts.google.com',
 
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  strictDiscoveryDocumentValidation: false,
  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: '638647625722-4sn77mlqrkptqibp0k5avi46qh8aipgk.apps.googleusercontent.com',
 
  // set the scope for the permissions the client should request
  scope: 'https://www.googleapis.com/auth/androidpublisher',
}