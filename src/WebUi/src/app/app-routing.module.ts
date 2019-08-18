import{NgModule} from'@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import { MyTodoItemListComponent } from './components/mytodo-item-list/mytodo-item-list.component';

const routes: Routes = [
{ path: '**', component: MyTodoItemListComponent }
];


@NgModule({
imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
