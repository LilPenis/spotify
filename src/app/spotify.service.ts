import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Artist } from './Artist';
import { ResponseText } from './ResponseText';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  responseText: ResponseText | undefined;


  client_id = "0686c038acbe4b5aa362f65be3b927f3";
  client_secret = "79b18ca57d194c6db44b18202c82f764";
  redirectedUri = "http://localhost:4200/home";
  authorizeUrl = "https://accounts.spotify.com/authorize";
  artistUrl = "https://api.spotify.com/v1/artists";
  tokenUrl = "https://accounts.spotify.com/api/token";
  access_token: any = "hey";
  
  httpOptions = {
    headers: new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ${localStorage.getItem("access_token")}')//${localStorage.getItem("access_token")}`
  };

  authorizationHeader = {
    headers: new HttpHeaders()
    .set('Authorization', 'Basic ' + btoa(this.client_id + ":" + this.client_secret))
    .set('Content-Type', 'application/x-www-form-urlencoded')
  };

  constructor(private http: HttpClient, private router: ActivatedRoute, private location: Location) { }

  getArtistById(id: string): Observable<Artist> {
    const url = `${this.artistUrl}/${id}`;
     return this.http.get<Artist>(url, this.httpOptions);
 
   }
 
   requestAuthorization(): void {
     let authUrl = this.authorizeUrl; 
     authUrl += "?client_id=" + this.client_id;
     authUrl += "&response_type=code";
     authUrl += "&redirect_uri=" + encodeURI(this.redirectedUri);
     authUrl += "&show_dialog=true";
     location.href = authUrl; // Show Spotify's authorization screen
   }
 
   public getAccessToken(): void {
     let code = "";
     let status = 1;
     this.router.queryParams.subscribe((queryParams) => {
       code = queryParams.code;
       let body = "grant_type=authorization_code";
      body += "&code=" + code;
      body += "&redirect_uri=" + this.redirectedUri;
      body += "&client_id=" + this.client_id;
      body += "&client_secret=" + this.client_secret;
       this.handleAuthResponse(body)
       .subscribe(resp => status = resp.status);
       console.log("response", status);
       localStorage.setItem("access_token", this.access_token);
       console.log('AccessToken', this.access_token);
     });
   }
   
   handleAuthResponse(body: string): Observable<HttpResponse<ResponseText>>{
    return this.http.post<ResponseText>(this.tokenUrl, body, { observe: 'response', headers: new HttpHeaders()
    .set('Authorization', 'Basic ' + btoa(this.client_id + ":" + this.client_secret))
    .set('Content-Type', 'application/x-www-form-urlencoded')});
  }
}

/*
handleAuthResponse(body: string): Observable<ResponseText>{
      return this.http.post<ResponseText>(this.tokenUrl, body, this.authorizationHeader);
   }
*/