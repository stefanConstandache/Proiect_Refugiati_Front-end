export const environment = {
  production: true,

  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://localhost:8180/auth/',
    // Realm
    realm: 'PwebKeycloak',
    clientId: 'angular',
  },

};
