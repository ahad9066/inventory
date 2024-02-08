import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable()
export class ApiService {
    constructor(private httpClient: HttpClient) {
    }


    public getProducts() {
        return this.httpClient.get(`${environment.productsBaseUrl}/feTi`);
    }



}

