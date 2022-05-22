import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
    constructor(
        protected override readonly router: Router,
        protected readonly keycloak: KeycloakService
    ) {
        super(router, keycloak);
    }

    public async isAccessAllowed(
        route: ActivatedRouteSnapshot,
    ) {
        // Force the user to log in if currently unauthenticated.
        if (!this.authenticated) {
            // TODO: Aici ceva loging
            await this.keycloak.login();
        }

        // Get the roles required from the route.
        const requiredRoles = route.data['roles'];

        // Allow the user to to proceed if no additional roles are required to access the route.
        if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
            return true;
        }

        // Allow the user to proceed if all the required roles are present.
        if (requiredRoles.every((role) => this.roles.includes(role))) {
            return true;
        } else {
            if (this.roles.includes("admin")) {
                this.router.navigate(['/admin']);
            } else if (this.roles.includes("volunteer")) {
                this.router.navigate(['/volunteer']);
            } else if (this.roles.includes("refugee")) {
                this.router.navigate(['/refugee']);
            }

            return false;
        }
    }
}
