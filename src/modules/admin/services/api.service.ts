import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

    // tslint:disable-next-line: typedef
    public addEmployee(payload: any) {
        console.log("adddd servive", payload)
        return this.httpClient.post(`${environment.baseURL}/employee/addEmployee`, payload);
    }
    public getEmployees() {
        return this.httpClient.get(`${environment.baseURL}/employee`);
    }

}

