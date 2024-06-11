import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {LandingComponent} from "./demo/components/landing/landing.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: LandingComponent, loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule)},
            { path: 'killers', component: AppLayoutComponent, loadChildren: () => import('./demo/components/pages/killers/killers.module').then(m => m.KillersModule)},
            { path: 'victims', component: AppLayoutComponent, loadChildren: () => import('./demo/components/pages/victims/victims.module').then(m => m.VictimsModule) },
            { path: 'convictions', component: AppLayoutComponent, loadChildren: () => import('./demo/components/pages/convictions/convictions.module').then(m => m.ConvictionsModule) },
            { path: 'continents', component: AppLayoutComponent, loadChildren: () => import('./demo/components/pages/continents/continents.module').then(m => m.ContinentsModule) },
            { path: 'countries', component: AppLayoutComponent, loadChildren: () => import('./demo/components/pages/countries/countries.module').then(m => m.CountriesModule) },
            { path: 'graph', component: AppLayoutComponent, loadChildren: () => import('./demo/components/pages/graph/graph.module').then(m => m.GraphModule) },
            { path: '**', redirectTo: '/' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
