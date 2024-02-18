import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-global-map',
  standalone: true,
  imports: [],
  templateUrl: './global-map.component.html',
  styleUrl: './global-map.component.css',
})
export class GlobalMapComponent {
  location: any = {};
data: any;
  constructor(private apiService: ApiService) {}

  setCountryData(event: any) {
    console.log('event', event.target.id);
    this.apiService
      .setCountryData(event.target.id)
      .subscribe((data: any) => {
        console.log(data);
        this.location = {
          ...data,
          country: event.target.getAttribute('name')
        }
      })
  }
}
