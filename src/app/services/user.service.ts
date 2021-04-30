import {Injectable} from "@angular/core";
import {CognitoUser, CognitoUserAttribute, CognitoUserSession, CognitoUserPool, AuthenticationDetails} from 'amazon-cognito-identity-js';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NotificationService} from "./notification.service";

type AuthenticationResponseCodes = "MFA_SETUP" | "NEW_PASSWORD_REQUIRED" | "SMS_MFA" | "SOFTWARE_TOKEN_MFA";
type AuthenticationResponseErrorCodes = "NotAuthorizedException" | "PasswordResetRequiredException" | "UserNotConfirmedException" | "UserNotFoundException";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private loggedInState$ = new BehaviorSubject<boolean>(false);
    private activeUsernameState$ = new BehaviorSubject<string>('');
    private userSessionState$ = new BehaviorSubject<CognitoUserSession | null>(null);
    private userPool: CognitoUserPool;
    private cognitoUserState: CognitoUser | null;

    constructor(private notificationService: NotificationService) {
        const poolData = {
            UserPoolId: '...', // Your user pool id here
            ClientId: '...', // Your client id here
        };
        this.userPool = new CognitoUserPool(poolData);
    }

    async authenticate(username: string, password: string): Promise<boolean> {
        var userData = {
            Username: username,
            Pool: this.userPool,
        };
        const cognitoUser = new CognitoUser(userData);
        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password
        });
        return new Promise((res, rej) => cognitoUser.authenticateUser(authDetails, {
            onFailure: (err) => {
                if(err.hasOwnProperty('challengeName'))
                    this.checkAuthenticationResponse(err.challengeName);
                // this.loggedInState$.next(false);
                this.errorNotification(err.message, 'Authentication');
                rej(false);
            },
            onSuccess: (session: CognitoUserSession) => {
                this.loggedInState$.next(session.isValid());
                this.userSessionState$.next(session);
                this.getCurrentUsername(cognitoUser);
                this.cognitoUserState = cognitoUser;
                res(true);
            }
        }));
    }

    async requestNewValidationCode(): Promise<boolean> {
        return new Promise((res, rej) => this.cognitoUserState.resendConfirmationCode((err, result) => {
            if(err) {
                rej(false);
                return;
            }
            res(true);
        }));
    }

    async confirmNewPassword(username: string, verificationCode: string, password: string): Promise<boolean> {
        const title = "Confirm password";
        var userData = {
            Username: username,
            Pool: this.userPool,
        };
        const cognitoUser = new CognitoUser(userData);
        return new Promise((res, rej) => cognitoUser.confirmPassword(verificationCode, password, {
            onFailure: (err) => {
                this.errorNotification(err.message, title);
                rej(false);
            },
            onSuccess: () => {
                this.successNotification("New password saved", title);
                res(true);
            }
        }));
    }

    get getIdToken$(): Observable<string> {
        return this.userSessionState$.asObservable().pipe(
            map((session) => session.getIdToken().getJwtToken())
        );
    }

    get getAccessToken$(): Observable<string> {
        return this.userSessionState$.asObservable().pipe(
            map((session) => session.getAccessToken().getJwtToken())
        );
    }

    get isLoggedIn$(): Observable<boolean> {
        return this.loggedInState$.asObservable();
    }

    logout(): void {
        this.loggedInState$.next(false);
        this.cognitoUserState.signOut();
    }

    async resetPassword(oldPassword: string, newPassword: string): Promise<boolean> {
        return new Promise((res,rej) => this.cognitoUserState.changePassword(oldPassword, newPassword, (err, _) => {
            if(err) {
                rej(false);
                return;
            }
            res(true);
        }));
    }

    get passwordPattern(): string {
        return "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_%&'\"/~£=;:<>`\\[\\]\\\\^$.|?*+(){}\\-+]).{12,}";
    }

    private getCurrentUsername(cognitoUser: CognitoUser): void {
        cognitoUser.getUserData((err, data) => {
            if(err) {
                this.errorNotification("Unable to get the current user name", "Current user");
            }
            const name = data.UserAttributes.find((value) => value.Name == 'name').Value;
            this.activeUsernameState$.next(name);
        });
    }

    private checkAuthenticationResponse(code: AuthenticationResponseCodes) {
        switch(code) {
            case "MFA_SETUP":
                this.warnNotification("Please configure MFA", "MFA Setup");
                // return new AuthenticationResolution(true, false, false);
            case "NEW_PASSWORD_REQUIRED":
                this.warnNotification("Please create a new password", "New password");
                // return new AuthenticationResolution(false, true, false);
            case "SMS_MFA":
                this.warnNotification("Please confirm with sms MFA", "SMS MFA");
                // return new AuthenticationResolution(true, false, false);
            case "SOFTWARE_TOKEN_MFA":
                this.warnNotification("Please confirm with token MFA", "Token MFA");
                // return new AuthenticationResolution(true, false, false);
            default:
                this.successNotification("Your login is successful", "Login Success");
                // return new AuthenticationResolution(false, false, true);
        }
    }

    private errorNotification(message: string, title: string) {
        this.notificationService.addErrorToast(message, title);
    }

    private successNotification(message: string, title: string) {
        this.notificationService.addSuccessToast(message, title);
    }

    private warnNotification(message: string, title: string) {
        this.notificationService.addWarningToast(message, title);
    }
}