import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
// import { bootstrapApplication } from "@angular/platform-browser";

@Component({
  selector: "button-ng",
  templateUrl: "./button-ng.component.html",
  styleUrls: ["./button-ng.component.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ButtonNgComponent {
  title = "left-sidebar";

  onClickHandler() {
    console.log("Clicked from ionic-angular");
  }
}

// bootstrapApplication(ButtonNgComponent);
