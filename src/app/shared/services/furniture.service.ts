import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";
import { DisplayFurnitureDTO } from "src/app/shared/models/displayFurnitureDTO";
import { AppConstants } from 'src/app/shared/models/AppConstants';

@Injectable({
	providedIn: 'root'
})
export class FurnitureService extends ErrorHandler {
	//file: FormData;
  file:any;
	constructor(private http: HttpClient) {
		super();
	}
	public getSearchresults(value:String){
		return this.http.get<DisplayFurnitureDTO[]>(AppConstants.baseURL+"furniture/findfurniture?text="+value);
	};

	public addImage(file1: File): Observable<HttpEvent<{}>> {
		const data: FormData = new FormData();
		data.append('file', file1);
		const newRequest = new HttpRequest('POST', AppConstants.baseURL + 'furniture/savefile', data, {

			responseType: 'text'  as 'json'
		});
		return this.http.request(newRequest);
	}
	public addFurniture(furniture) {
		return this.http.post( AppConstants.baseURL+'furniture/addFurniture', furniture, {
			responseType: 'text' as 'json'
		});
	}

	handleError(error) {
		alert(error.error);
	}
}
