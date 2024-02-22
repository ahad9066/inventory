import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService, ModuleConfig } from './services/api.service';

import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../shared/shared.module';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersState } from './store/state/orders.state';
import { PendingOrdersComponent } from './components/pending-orders/pending-orders.component';
import { CompletedOrdersComponent } from './components/completed-orders/completed-orders.component';


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
    
    PendingOrdersComponent,
         CompletedOrdersComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OrdersRoutingModule,
        NgxsModule.forFeature([OrdersState]),
        SharedModule,
        SharedMaterialModule
    ],
})
export class OrdersModule {
    static forRoot(options?: ModuleOptions): ModuleWithProviders<OrdersModule> {
        return {
            ngModule: OrdersModule,
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

