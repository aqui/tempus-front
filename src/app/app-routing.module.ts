import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './_components/signin/signin.component';
import { AuthGuard } from "./_services/auth.guard";
import { LandingComponent } from './_components/landing/landing.component';
import { UserComponent } from './_components/user/user.component';
import { SystemComponent } from './_components/landing/system/system.component';
import { CompanyComponent } from './_components/landing/system/company/company.component';
import { EquipmentComponent } from './_components/landing/system/equipment/equipment.component';
import { DutyComponent } from './_components/landing/system/duty/duty.component';
import { ShiftTypeComponent } from './_components/landing/system/shiftType/shiftType.component';
import { WarehouseComponent } from './_components/landing/system/warehouse/warehouse.component';

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: SigninComponent },
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'system', component: SystemComponent, canActivate: [AuthGuard] },
  { path: 'system/company', component: CompanyComponent, canActivate: [AuthGuard] },
  { path: 'system/equipment', component: EquipmentComponent, canActivate: [AuthGuard] },
  { path: 'system/duty', component: DutyComponent, canActivate: [AuthGuard] },
  { path: 'system/shiftType', component: ShiftTypeComponent, canActivate: [AuthGuard] },
  { path: 'system/warehouse', component: WarehouseComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }