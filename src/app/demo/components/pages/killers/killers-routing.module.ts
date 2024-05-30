import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KillersComponent } from './killers.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: KillersComponent }
	])],
	exports: [RouterModule]
})
export class KillersRoutingModule { }
