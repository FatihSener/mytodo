import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyTodoItemListComponent } from './components/mytodo-item-list/mytodo-item-list.component';
// import { MyTodoItemService } from 'app/services/mytodo-item.service';

@NgModule({
  declarations: [
    AppComponent,
    MyTodoItemListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
