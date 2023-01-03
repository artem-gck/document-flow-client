import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule.forRoot({
      config: {
        authority: "https://localhost:8083",
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: "angular",
        scope: 'angular profile openid offline_access gateway_api signature_api notification_api management_api document_api structure_api task_api userinfo_api',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
  ]
})
export class AuthenticationModule { }