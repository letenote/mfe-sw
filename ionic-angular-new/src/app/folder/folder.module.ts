import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { FolderPageRoutingModule } from "./folder-routing.module";

import { FolderPage } from "./folder.page";
import { ButtonWrapperComponent } from "../button-wrapper/button-wrapper.component";
import { ButtonNgComponent } from "../button-ng/button-ng.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    ButtonWrapperComponent,
    ButtonNgComponent,
  ],
  declarations: [FolderPage],
})
export class FolderPageModule {}
