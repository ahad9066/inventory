import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export class ModuleConfig {
    public baseURL: string;
    public spaURL: string;
}

@Injectable()
export class ApiService {
    baseURL: string;
    constructor(private httpClient: HttpClient, options: ModuleConfig) {
        this.baseURL = options.baseURL;
    }

    // tslint:disable-next-line: typedef
    public signUp(data: any) {
        return this.httpClient.post(`${environment.baseURL}/auth/signup`, data);
    }

    public login(data: any) {
        return this.httpClient.post(`${environment.baseURL}/auth/employeeLogin`, data);
    }
    public logout() {
        return this.httpClient.get(`${environment.baseURL}/auth/employeeLogout`);
    }
    public getEmployeeDetails(empId) {
        return this.httpClient.get(`${environment.baseURL}/employee/${empId}`);
    }
}

