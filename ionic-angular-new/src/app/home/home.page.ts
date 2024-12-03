import { Component } from "@angular/core";
import { IonicSlides, NavController } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { register } from "swiper/element/bundle";
import { accessibilityOutline } from "ionicons/icons";
import { addIcons } from "ionicons";
import { IonicRestService } from "src/services/ionic-rest.service";

register();
@Component({
  selector: "home-page",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage {
  swiperModules = [IonicSlides];
  protected env = environment;
  protected username: string | null = "";
  constructor(
    private navCtrl: NavController,
    private ionicRestService: IonicRestService
  ) {
    localStorage.setItem("name", "123");
    addIcons({ accessibilityOutline });
  }
  ngOnInit() {
    console.log("XXX", environment.host);
    this.username = localStorage.getItem("username");
    console.log("GET:STORRAGE:username:1", { val: this.username });
    // const x = localStorage.getItem("redirect");
    // console.log("GET:STORRAGE:APPCOMPO:1", { val: x });
    // this.navCtrl.navigateRoot("folder/inbox");
  }

  getUsers() {
    this.ionicRestService.getStudentList().subscribe((data) => {
      console.log("get.users", data);
    });
  }
}
