export const environment = {
  production: true,

  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://localhost:8080/auth/',
    // Realm
    realm: 'PwebKeycloak',
    clientId: 'angular',
  },

};
