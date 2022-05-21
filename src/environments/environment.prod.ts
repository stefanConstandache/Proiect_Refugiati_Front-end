export const environment = {
  production: true,

  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://idp_keycloak:8080/auth/',
    // Realm
    realm: 'PwebKeycloak',
    clientId: 'angular',
  },

};
