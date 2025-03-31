import { Component, Input, OnInit } from '@angular/core';
import { MusicServiceService } from '../service/music-service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Artist } from '../models/artists.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListAlbumsComponent } from '../list-albums/list-albums.component';

@Component({
  selector: 'app-list-artists',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ListAlbumsComponent,
    HttpClientModule
  ],
  templateUrl: './list-artists.component.html',
  styleUrl: './list-artists.component.css'
})
export class ListArtistsComponent implements OnInit{
  @Input() artist! : Artist;
  selectedArtist: Artist | null = null;
  artists: Artist[] = [];

  constructor(private route: ActivatedRoute, private service: MusicServiceService) {}

  ngOnInit(): void {
    console.log("Getting data....");
    this.service.getArtists((artists: Artist[]) => {
      this.artists = artists;
      console.log("artists: ", this.artists);
    });
  }

  onSelectArtist(artist:Artist) {
    this.selectedArtist = artist;
  }
}
