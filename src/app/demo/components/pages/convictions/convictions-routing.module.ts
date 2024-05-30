import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConvictionsComponent } from './convictions.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ConvictionsComponent }
	])],
	exports: [RouterModule]
})
export class ConvictionsRoutingModule { }
