import { Routes, RouterModule } from '@angular/router';

//import { HomeComponent } from './home/index';
//import { LoginComponent } from './login/index';
//import { RegisterComponent } from './register/index';
//import { AuthGuard } from './_guards/index';
import {UserDetailsComponent} from "./user-details/user-details.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./auth.guard";
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./login/login.component";

const appRoutes: Routes = [
    { path: '', component: UserDetailsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'details', component: UserDetailsComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
