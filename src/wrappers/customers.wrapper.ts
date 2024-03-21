import { NgModule } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CustomersModule, ModuleConfig } from 'src/modules/customers/customers.module';

export function ModuleConfigFactory(): ModuleConfig {
    return {
        baseURL: environment.baseURL,
        spaURL: environment.spaURL,
        productsBaseUrl: environment.productsBaseUrl
    };
}

@NgModule({
    imports: [CustomersModule.forRoot()],
    providers: [
        {
            provide: ModuleConfig,
            useFactory: ModuleConfigFactory
        }
    ]
})

export class CustomersWrapperModule { }



//