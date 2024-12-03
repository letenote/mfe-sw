import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { HomePageRoutingModule } from "./home-routing.module";
import { HomePage } from "./home.page";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { PdfViewerModule } from "ng2-pdf-viewer";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CKEditorModule,
    PdfViewerModule,
  ],
  declarations: [HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
