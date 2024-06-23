import { Routes } from '@angular/router';
import { TestbedComponent } from './testbed/testbed.component';


export const routes: Routes = [
    {path:'', redirectTo: 'testbed', pathMatch: 'full'},
    {path: 'testbed', component: TestbedComponent}
];
