import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                await keycloak.init({
                    config: {
                        url: environment.keycloak.issuer,
                        realm: environment.keycloak.realm,
                        clientId: environment.keycloak.clientId,
                    },
                    loadUserProfileAtStartUp: true,
                    initOptions: {
                        onLoad: 'login-required',
                        checkLoginIframe: true,
                    },
                    // By default the keycloak-angular library add Authorization: Bearer TOKEN to all http requests
                    // Then to exclude a list of URLs that should not have the authorization header we need to provide  them here.
                    bearerExcludedUrls: ['/assets'],
                });
                resolve(resolve);
            } catch (error) {
                reject(error);
            }
        });
    };
}