import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {RulesComponent} from './rules/rules.component';

const routes: Routes = [
  {path: '', redirectTo: 'main-menu', pathMatch: 'full'},
  {path: 'main-menu', component: MainMenuComponent},
  {path: 'rules', component: RulesComponent},
  {
    path: 'playground',
    loadChildren: () =>
      import('./playground/playground.module').then((m) => m.PlaygroundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
