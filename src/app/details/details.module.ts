import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalWrapperComponent } from './modal-container.component';

@NgModule({
  declarations: [ ModalWrapperComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ModalWrapperComponent, data: { component: DetailsComponent }}]),
    NgbModule,
  ]
})
export class DetailsModule { }
