import { provideRouter, RouterModule, Routes } from '@angular/router';
import { PatientFormComponent } from './patient-form.component';
import { HomeComponent } from './home.component';
import { BookingComponent } from './booking.component';
import { AboutComponent } from './about.component';
import { ServicesComponent } from './services.component';
import { TeamComponent } from './team.component';
import { ArticlesComponent } from './articles.component';
import { FAQComponent } from './faq.component';
import { ContactComponent } from './contact.component';
import { AiComponent } from './ai.component';
import { AdminLoginComponent } from './admin-login.component';
import { DashboardComponent } from './dashboard.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'patient', component: PatientFormComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'team', component: TeamComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'ai', component: AiComponent },
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'home' }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
