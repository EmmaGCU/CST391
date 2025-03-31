import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-album',
  imports: [HttpClientModule],
  templateUrl: './delete-album.component.html',
  styleUrl: './delete-album.component.css'
})
export class DeleteAlbumComponent {

}
