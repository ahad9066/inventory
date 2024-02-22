import { NgModule } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ModuleConfig, OrdersModule } from 'src/modules/orders/orders.module';

export function ModuleConfigFactory(): ModuleConfig {
    console.log("asdfadsfsafsadf")
    return {
        baseURL: environment.baseURL,
        spaURL: environment.spaURL,
        productsBaseUrl: environment.productsBaseUrl
    };
}

@NgModule({
    imports: [OrdersModule.forRoot()],
    providers: [
        {
            provide: ModuleConfig,
            useFactory: ModuleConfigFactory
        }
    ]
})

export class OrderWrapperModule { }



//