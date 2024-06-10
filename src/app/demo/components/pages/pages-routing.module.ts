import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        // { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.KillersModule) },
        // { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        // { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
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
