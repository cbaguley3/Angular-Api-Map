import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {}

  fetchCountryData(country: string): Observable<any> {
    const apiUrl = `https://api.worldbank.org/v2/country/${country}?format=json`;

    return this.http.get(apiUrl).pipe(
      map((response: any) => {
        const data = response[1][0]; 
        return {
          name: data.name,
          capital: data.capitalCity,
          region: data.region.value,
          income: data.incomeLevel.value,
          longitude: data.longitude,
          latitude: data.latitude,
        };
      }),
      catchError((error: any) => {
        
        console.error('Error fetching country data:', error);
        return throwError(error);
      })
    );
  }

  
  private countryDataSubject = new Subject<any>();

  setCountryData(country: string): Observable<any> {
    this.fetchCountryData(country).subscribe(
      (data: any) => {
        this.countryDataSubject.next(data);
      },
      (error: any) => {
        
        console.error('Error fetching and setting country data:', error);
      }
    );

    return this.countryDataSubject.asObservable();
  }
}
