import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CountriesComponent } from './countries.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CountriesComponent }
	])],
	exports: [RouterModule]
})
export class CountriesRoutingModule { }
