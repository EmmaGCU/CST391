import { Component, Input } from '@angular/core';
import { Album } from '../models/albums.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-display-album',
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './display-album.component.html',
  styleUrl: './display-album.component.css'
})
export class DisplayAlbumComponent {
  @Input() album!: Album;
}
