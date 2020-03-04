import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './_components/signin/signin.component';
import { AuthGuard } from "./_services/auth.guard";
import { LandingComponent } from './_components/landing/landing.component';
import { UserComponent } from './_components/user/user.component';
import { SystemComponent } from './_components/landing/system/system.component';
import { CompanyComponent } from './_components/landing/system/company/company.component';
import { EquipmentComponent } from './_components/landing/system/parameter/equipment/equipment.component';
import { DutyComponent } from './_components/landing/system/parameter/duty/duty.component';
import { ShiftTypeComponent } from './_components/landing/system/parameter/shiftType/shiftType.component';
import { WarehouseComponent } from './_components/landing/system/parameter/warehouse/warehouse.component';
import { WorkTypeComponent } from './_components/landing/system/parameter/workType/workType.component';
import { CodeTableComponent } from './_components/landing/system/parameter/codetable/codetable.component';
import { HolidayTypeComponent } from './_components/landing/system/parameter/holidayType/holidayType.component';
import { ParameterComponent } from './_components/landing/system/parameter/parameter.component';

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: SigninComponent },
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'system', component: SystemComponent, canActivate: [AuthGuard] },
  { path: 'system/company', component: CompanyComponent, canActivate: [AuthGuard] },
  { path: 'system/parameter/equipment', component: EquipmentComponent, canActivate: [AuthGuard] },
  { path: 'system/parameter/duty', component: DutyComponent, canActivate: [AuthGuard] },
  { path: 'system/parameter/shiftType', component: ShiftTypeComponent, canActivate: [AuthGuard] },
  { path: 'system/parameter/warehouse', component: WarehouseComponent, canActivate: [AuthGuard] },
  { path: 'system/parameter/workType', component: WorkTypeComponent, canActivate: [AuthGuard] },
  { path: 'system/parameter', component: ParameterComponent, canActivate: [AuthGuard] },
  { path: 'system/parameter/codeTable', component: CodeTableComponent, canActivate: [AuthGuard] },
  { path: 'system/parameter/holidayType', component: HolidayTypeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }