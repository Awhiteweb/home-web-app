import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: "app-reset-password",
    templateUrl: "./reset-password.component.html",
})
export class ResetPasswordComponent implements OnInit {
    form: FormGroup
    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            username: ['', Validators.required],
            verificationCode: ['', Validators.required],
            password: ['', Validators.compose([
                Validators.required,
                Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_%&'\"/~£=;:<>`\\[\\]\\\\^$.|?*+(){}\\-+]).{12,}")
            ])],
            confirmationPassword: ['', Validators.compose([
                Validators.required,
                Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_%&'\"/~£=;:<>`\\[\\]\\\\^$.|?*+(){}\\-+]).{12,}")
            ])]
        }, {validators: this.validPassword})
    }

    async submit(): Promise<void> {
        // this.thinking = true;
        if(this.form.valid) {
            // const response = await this.userService.confirmNewPassword(
            //     this.usernameControl.value,
            //     this.codeControl.value,
            //     this.form.get("confirm").get("password").value);
            // if(response.success) {
            //     this.router.navigate([ACCOUNTS_ROOT]);
            //     this.form.reset();
            // }
        }
        // this.thinking = false;
    }

    private validPassword(form: FormGroup): any {
        let p1 = form.get('password').value;
        let p2 = form.get('confirmationPassword').value;
        return p1 === p2 ? null : {notSame: true};
    }
}
