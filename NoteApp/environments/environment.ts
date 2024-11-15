// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const api = 'http://localhost:3000';

export const environment = {
  production: false,

  // --- Danger
  delete_account: api + '/account/user/delete',

  // --- Auth
  auth: api + '/auth/login',
  register: api + '/auth/create',

  // --- Account
  account: api + '/account/user/profile',
  preferences: api + '/account/user/preferences',

  // --- Notes
  notes: api + '/notes',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
