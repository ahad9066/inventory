import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService, ModuleConfig } from './services/api.service';

import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../shared/shared.module';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AdminState } from './store/state/admin.state';


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

        AddUserComponent,
        EmployeeListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        NgxsModule.forFeature([AdminState]),
        SharedModule,
        SharedMaterialModule
    ],
})
export class AdminModule {
    static forRoot(options?: ModuleOptions): ModuleWithProviders<AdminModule> {
        return {
            ngModule: AdminModule,
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

