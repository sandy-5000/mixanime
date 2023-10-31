import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BackendService {

	_baseURL: string = 'https://mixanime.onrender.com'
	// _baseURL: string = 'http://127.0.0.1:5000'

	constructor(private httpClient: HttpClient) { }

	get(url: string, params: any): Observable<any> {
		return this.httpClient.get(this._baseURL + url, { params });
	}

	post(url: string, data: any): Observable<any> {
		const config = {
			headers: new HttpHeaders()
				.set('Content-Type', 'application/json')
				.set('Access-Control-Allow-Origin', '*')
				.set('Access-Control-Allow-Methods', 'POST')
				.set('token', localStorage.getItem('token') || '')
		}
		return this.httpClient.post<any>(this._baseURL + url, data, config)
	}

}
