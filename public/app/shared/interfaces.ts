import { ModuleWithProviders } from '@angular/core';

export interface IFeature {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    zip: number;
    gender: string;
    orderCount?: number;
    orderTotal?: number;
}

export interface IRouting {
    routes: ModuleWithProviders,
    components: any[]
}
