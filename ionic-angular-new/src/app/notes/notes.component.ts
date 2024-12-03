import {
  Component,
  ComponentRef,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";

interface Note {
  heading: string;
  description: string;
}

@Component({
  selector: "app-notes",
  standalone: true,
  imports: [],
  templateUrl: "./notes.component.html",
  styleUrl: "./notes.component.css",
})
export class NotesComponent {
  @ViewChild("customerComponent", { read: ViewContainerRef })
  customerComponent!: ViewContainerRef;

  async ngOnInit() {
    await this.loadRemote();
  }

  async loadRemote(): Promise<void> {
    const imported = await import("ionicAngularRemote/Customer");
    const componentRef: ComponentRef<any> =
      this.customerComponent.createComponent(imported.CustomerComponent);

    // set component input and subscribe to component outputs
    componentRef.setInput("firstName", "Dimas");
    componentRef.setInput("lastName", "Maulana");
    (componentRef.instance.getDataEvent as EventEmitter<string>).subscribe(
      (data) => {
        console.log("DEBUG:GET:DATA:EVENT:EMITTER", data);
      }
    );
  }

  notes: Note[] = [
    {
      heading: "File Taxes",
      description: "File taxes before April 31st",
    },
    {
      heading: "Post an Article",
      description: "Post an article to medium every week",
    },
    {
      heading: "Jog",
      description: "Make sure to jog today at 5:00 PM before you go out.",
    },
    {
      heading: "Grocery",
      description: "Bring some food for friends when you go out today.",
    },
  ];
}
