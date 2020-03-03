import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './_services/auth.interceptor';
import { SigninComponent } from './_components/signin/signin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LandingComponent } from './_components/landing/landing.component';
import { UserComponent } from './_components/user/user.component';
import { HeaderComponent } from './_components/header/header.component';
import { CompanyComponent } from './_components/landing/system/company/company.component';
import { TodoListComponent } from './_components/landing/todo-list/todo-list.component';
import { OperationCardsComponent } from './_components/landing/operation-cards/operation-cards.component';
import { WorkAssignmentComponent } from './_components/landing/work-assignment/work-assignment.component';
import { SystemComponent } from './_components/landing/system/system.component';
import { KioskComponent } from './_components/landing/kiosk/kiosk.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipmentComponent } from './_components/landing/system/equipment/equipment.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import { DutyComponent } from './_components/landing/system/duty/duty.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LandingComponent,
    UserComponent,
    HeaderComponent,
    CompanyComponent,
    TodoListComponent,
    OperationCardsComponent,
    WorkAssignmentComponent,
    SystemComponent,
    KioskComponent,
    EquipmentComponent,
    DutyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TabMenuModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
