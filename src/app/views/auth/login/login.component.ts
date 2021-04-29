import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { 
    this.form = this.fb.group({
      username: '',
      password: ''
    })
  }

  onSubmit() {
    console.log(`${this.form.get('username').value} ${this.form.get('password').value}`);
    this.form.reset();
  }
}
