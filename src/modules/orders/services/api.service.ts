import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export class ModuleConfig {
    public baseURL: string;
    public spaURL: string;
    public productsBaseUrl: string;
}

@Injectable()
export class ApiService {
    baseURL: string;
    constructor(private httpClient: HttpClient, options: ModuleConfig) {
        this.baseURL = options.baseURL;
    }


    public getOrders() {
        return this.httpClient.get(`${environment.productsBaseUrl}/orders/all`);
    }
    public updatePaymentStatus(payload) {
        return this.httpClient.put(`${environment.productsBaseUrl}/orders/updatePayment`, payload);
    }
    public downloadInvoice(fileKey): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { responseType: 'blob' as 'json', headers: headers };

        return this.httpClient.post(`${environment.productsBaseUrl}/orders/invoice`, { fileKey }, options);
    }
}

