import {Component, OnInit} from "@angular/core";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  form!: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void { 
    this.form = this.fb.group({
      username: '',
      password: ''
    })
  }

  onSubmit() {
    // console.log(`${this.form.get('username').value} ${this.form.get('password').value}`);
    this.form.reset();
  }
}
