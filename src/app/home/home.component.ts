import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Artist } from '../Artist';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  artist: Artist | undefined;

 
  access_token: any = null;
  artistName = "";


  constructor(private http: HttpClient, private router: ActivatedRoute, private location: Location, public spotifyService: SpotifyService) { }

  ngOnInit(): void {
      this.onPageLoad();
  }

  onPageLoad(): boolean{
    if(this.location.isCurrentPathEqualTo("/home") == false || this.location.isCurrentPathEqualTo("/home?access_denied") == true){
      console.log("executed");
        this.spotifyService.getAccessToken();
        this.location.replaceState("home");  
         return true;
    }
    else{
      //this.access_token = localStorage.getItem("access_token");
      console.log("Token",this.access_token);
      if (this.access_token == null) {
        return false;
      }
      else{
        return true;
      }
    }
    
  }

  showArtistName(id: string): void {
    this.spotifyService.getArtistById(id)
    .subscribe(artist => this.artistName = artist.name);
    

  }


  

}
