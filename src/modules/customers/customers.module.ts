import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService, ModuleConfig } from './services/api.service';

import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../shared/shared.module';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { CustomersRoutingModule } from './customers-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCartsComponent } from './components/user-carts/user-carts.component';
import { CustomersState } from './store/state/customer.state';
// import { AdminState } from './store/state/admin.state';


export { ModuleConfig };
export interface ModuleOptions {
    baseURL?: string;
    spaURL?: string;
}

export const FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<ModuleOptions>(
    'forRoot() Module configuration'
);

@NgModule({
    declarations: [

        UserListComponent,
        UserCartsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CustomersRoutingModule,
        NgxsModule.forFeature([CustomersState]),
        SharedModule,
        SharedMaterialModule
    ],
})
export class CustomersModule {
    static forRoot(options?: ModuleOptions): ModuleWithProviders<CustomersModule> {
        return {
            ngModule: CustomersModule,
            providers: [
                ApiService,
                {
                    provide: FOR_ROOT_OPTIONS_TOKEN,
                    useValue: options,
                },
                {
                    provide: ModuleConfig,
                    useFactory: provideMyServiceOptions,
                    deps: [FOR_ROOT_OPTIONS_TOKEN],
                },
            ],
        };
    }
}

export function provideMyServiceOptions(options?: ModuleOptions): ModuleConfig {
    const myServiceOptions = new ModuleConfig();
    if (options) {
        if (typeof options.baseURL === 'string') {
            myServiceOptions.baseURL = options.baseURL;
        }
        if (typeof options.spaURL === 'string') {
            myServiceOptions.spaURL = options.spaURL;
        }
    }
    return myServiceOptions;
}

