import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/app/shared/models/AppConstants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }

  public addReview(reviewAdded) {
    return this.http.post( AppConstants.baseURL+'review/addReview', reviewAdded, {
      responseType: 'text' as 'json'
    });
  }

  public updatedReview(reviewUpdated) {
    return this.http.post( AppConstants.baseURL+'review/updateReview', reviewUpdated, {
      responseType: 'text' as 'json'
    });
  }
}
