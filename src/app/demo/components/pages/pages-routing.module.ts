import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";

@NgModule({
    imports: [RouterModule.forChild([
        // { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.HomeModule) },
        // { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        // { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
        // { path: '', loadChildren: () => import('../landing/landing.module').then(m => m.LandingModule)},
        { path: 'killers', loadChildren: () => import('./killers/killers.module').then(m => m.KillersModule)},
        { path: 'victims', loadChildren: () => import('./victims/victims.module').then(m => m.VictimsModule) },
        { path: 'convictions', loadChildren: () => import('./convictions/convictions.module').then(m => m.ConvictionsModule) },
        { path: 'continents', loadChildren: () => import('./continents/continents.module').then(m => m.ContinentsModule) },
        { path: 'countries', loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule) },
        { path: 'graph', loadChildren: () => import('./graph/graph.module').then(m => m.GraphModule) },
       // { path: '**', redirectTo: '/landing' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
