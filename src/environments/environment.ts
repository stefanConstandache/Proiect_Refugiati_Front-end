// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: '/api',
  keycloak: {
    // Url of the Identity Provider
    // issuer: 'http://localhost:8180/auth/',
    // issuer: 'http://idp_keycloak:8080/auth/',
    // issuer: 'http://localhost:8080/auth/',
    issuer: 'http://localhost:8080/auth/',
    // Realm
    realm: 'PwebKeycloak',
    clientId: 'angular',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


// http://localhost:8080/auth/realms/PwebKeycloak/protocol/openid-connect/auth?client_id=angular&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F&state=4fc97f67-8099-4b38-8c9d-19039f8fdd4f&response_mode=fragment&response_type=code&scope=openid&nonce=7133fe0c-b3e8-4f61-b12f-02b603659766




