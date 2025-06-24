import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { PaiseToRupeesPipe } from './pipes/paise-to-rupees.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { Base64SrcDirective } from './directives/base64-src.directive';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatMenuModule,
  MatCardModule,
  MatTableModule,
  MatSelectModule,
  MatPaginatorModule,
  MatSidenavModule,
];

@NgModule({
  declarations: [
    NavbarComponent,
    PaiseToRupeesPipe,
    Base64SrcDirective,
    ConfirmDialogComponent,
  ],
  imports: [CommonModule, ...MATERIAL_MODULES, ReactiveFormsModule],
  exports: [
    NavbarComponent,
    ...MATERIAL_MODULES,
    PaiseToRupeesPipe,
    ReactiveFormsModule,
    Base64SrcDirective,
    ConfirmDialogComponent,
  ],
  providers: [CurrencyPipe, ErrorHandler],
})
export class SharedModule {}
