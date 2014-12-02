/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';

const { classes: Cc, interfaces: Ci } = Components;
const prefService = Cc['@mozilla.org/preferences-service;1'].
                    getService(Ci.nsIPrefService).
                    QueryInterface(Ci.nsIPrefBranch);
const prefName = 'security.tls.version.min';
const defaultValue = 1; // TLS 1.0

function install(data, reason) {}
function uninstall(data, reason) {}

function startup(data, reasonCode) {
  prefService.setIntPref(activePrefName, defaultValue);
}
function shutdown(data, reasonCode) {
  prefService.clearUserPref(activePrefName);
}
