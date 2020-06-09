import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBootstrapModule } from '../AppBootstrap/app-bootstrap/app-bootstrap.module';
import { FormsModule } from '@angular/forms';

import { TemplateFormComponent } from './template-form.component';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';


@NgModule({
  declarations: [
    TemplateFormComponent,
    FormDebugComponent,
    CampoControlErroComponent
  ],
  imports: [    
    CommonModule,
    FormsModule,
    AppBootstrapModule     
  ]
})
export class TemplateFormModule { }
