import { Component } from "@angular/core";
import * as $ from "jquery";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
} from "ckeditor5";
@Component({
  selector: "home-page",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage {
  public Editor = ClassicEditor;
  public config = {
    toolbar: ["undo", "redo", "|", "bold", "italic"],
    plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
    licenseKey: "<YOUR_LICENSE_KEY>",
    // mention: {
    //     Mention configuration
    // }
  };
  src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  constructor() {}
  ngOnInit() {}
}
