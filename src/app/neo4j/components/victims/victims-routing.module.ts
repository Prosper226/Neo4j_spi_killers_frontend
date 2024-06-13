import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VictimsComponent } from './victims.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: VictimsComponent }
	])],
	exports: [RouterModule]
})
export class VictimsRoutingModule { }
