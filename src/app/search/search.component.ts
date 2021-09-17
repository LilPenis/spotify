import { AbstractJsEmitterVisitor } from '@angular/compiler/src/output/abstract_js_emitter';
import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    
  constructor(private spotifyService:SpotifyService) { }

  

  ngOnInit(): void {
  }

}
