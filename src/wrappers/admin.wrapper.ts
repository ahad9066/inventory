import { NgModule } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AdminModule, ModuleConfig } from 'src/modules/admin/admin.module';

export function ModuleConfigFactory(): ModuleConfig {
    console.log("asdfadsfsafsadf")
    return {
        baseURL: environment.baseURL,
        spaURL: environment.spaURL,
        productsBaseUrl: environment.productsBaseUrl
    };
}

@NgModule({
    imports: [AdminModule.forRoot()],
    providers: [
        {
            provide: ModuleConfig,
            useFactory: ModuleConfigFactory
        }
    ]
})

export class AdminWrapperModule { }



//