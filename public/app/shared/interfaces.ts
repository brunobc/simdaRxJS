import { ModuleWithProviders } from '@angular/core';

export interface IFeature {
    _id?: string;
    type: string;
    features: any[];
    week: string;
    year: string;
}

export interface IRouting {
    routes: ModuleWithProviders,
    components: any[]
}
