import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListMarchandComponent } from './marchands/list-marchand/list-marchand.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { registerLocaleData } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N,fr_FR } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { AddMarchandComponent } from './marchands/add-marchand/add-marchand.component';
import fr from '@angular/common/locales/fr';
import { LoginComponent } from './login/login.component';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { MarchandService } from './shared/marchand.service';
import { PipefilterPipe } from './pipefilter.pipe';
import { LayoutComponent } from './layout/layout.component';
import { LayoutDashboardComponent } from './layout-dashboard/layout-dashboard.component';

registerLocaleData(fr);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
@NgModule({
  declarations: [
    AppComponent,
    ListMarchandComponent,
    AddMarchandComponent,
    LoginComponent,
    PipefilterPipe,
    LayoutComponent,
    LayoutDashboardComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    BrowserAnimationsModule,
    ScrollingModule,
    DragDropModule,
    NgZorroAntdMobileModule
  ],
  providers: [ { provide: NZ_I18N, useValue: fr_FR},{ provide: NZ_ICONS, useValue: icons },MarchandService],
  bootstrap: [AppComponent]
})
export class AppModule { }
