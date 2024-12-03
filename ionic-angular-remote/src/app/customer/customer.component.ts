// https://github.com/love1024/angular-mfe/tree/mains
// https://github.com/edumserrano/webpack-module-federation-with-angular/blob/main/code-demos/component-standalone-ng16/shell-ng16/src/app/app.component.ts
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

interface Data {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

@Component({
  selector: "app-customer",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./customer.component.html",
  styleUrl: "./customer.component.css",
})
export class CustomerComponent implements OnInit {
  @Input() public firstName: string = "";
  @Input() public lastName: string = "";
  @Output()
  public readonly getDataEvent: EventEmitter<Data> = new EventEmitter<Data>();

  protected _data: Data = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  };

  ngOnInit(): void {
    this._data.firstName = this.firstName;
    this._data.lastName = this.lastName;
  }

  protected saveData() {
    this.getDataEvent.emit(this._data);
    window.location.reload();
  }
}
