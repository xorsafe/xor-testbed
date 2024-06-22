import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestSelectingPlatformComponent } from '../../../xor-testbed/src/public-api';
// import { TestSelectingPlatformComponent, TestbedComponent } from 'xor-testbed';

export const routes: Routes = [
    {path:'', redirectTo: 'testbed', pathMatch: 'full'},
    {path: 'testbed', component: TestSelectingPlatformComponent}
];
