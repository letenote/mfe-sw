import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IonicRestService } from "../../services/ionic-rest.service";
@Component({
  selector: "app-folder",
  templateUrl: "./folder.page.html",
  styleUrls: ["./folder.page.scss"],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(private ionicRestService: IonicRestService) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get("id") as string;
    this.ionicRestService.getStudentList().subscribe((data) => {
      console.log("users", data);
    });

    this.ionicRestService
      .fetchPosts()
      .then((res) => {
        console.log("get post success", res);
      })
      .catch((err) => {
        console.log("get post failed", err);
      });
  }
}
