import { AddReview } from './../models/AddReviewDTO';
import { TestBed } from '@angular/core/testing';
import { getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { ReviewService } from './review.service';

describe('ReviewService', () => {

    let injector: TestBed;
    let service: ReviewService;
    let httpMock: HttpTestingController;
  let review:AddReview;
  
  let http:any;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ReviewService]
      });
      injector = getTestBed();
      service = injector.get(ReviewService);
      httpMock = injector.get(HttpTestingController);
    });
  
  
    it('should add a review', () => {
      const dummyMessage="Your review is added"
  
      service.addReview('review').subscribe( data=> {
   expect(data).toEqual(dummyMessage);
      });
  
      const req = httpMock.expectOne("http://localhost:8080/review/addReview");
      expect(req.request.method).toBe('POST');
      req.flush(dummyMessage);
    });
  
    it('should update a review', () => {
        const dummyMessage="Review updated"
    
        service.updatedReview('review').subscribe( data=> {
     expect(data).toEqual(dummyMessage);
        });
    
        const req = httpMock.expectOne("http://localhost:8080/review/updateReview");
        expect(req.request.method).toBe('POST');
        req.flush(dummyMessage);
      });    
 
});
