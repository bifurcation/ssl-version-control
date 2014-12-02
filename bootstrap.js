/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';

const { classes: Cc, interfaces: Ci } = Components;
const prefService = Cc['@mozilla.org/preferences-service;1'].
                    getService(Ci.nsIPrefService).
                    QueryInterface(Ci.nsIPrefBranch);
const prefName = 'security.tls.version.min';
const prefPrefix = 'ssl-version-control.';
const defaultValue = 1; // TLS 1.0

// We need to do a bit of a dance to make the Disable / Remove buttons
// restore the active pref to its prior state.
//
// We use two prefs to store state, plus security.tls.version.min
//   ssl-version-control.old.security.tls.version.min
//   ssl-version-control.current.security.tls.version.min
//
// Install:  [active] -> [old],  [default] -> [active], [active] -> [current]
// Shutdown: [active] -> [current], [old] -> [active]
// Startup:  [current] -> [active]
var activePrefName = prefName;
var oldPrefName = prefPrefix + "old." + prefName;
var currentPrefName = prefPrefix + "current." + prefName;

function copyPref(src, dst) {
  prefService.setIntPref(dst, prefService.getIntPref(src));
}

// Cache the old value of the pref and restore it
function install(data, reason) {
  dump("sslvc: install\n");
  copyPref(activePrefName, oldPrefName);
  prefService.setIntPref(activePrefName, defaultValue);
  copyPref(activePrefName, currentPrefName);
}

// shutdown() does everything we need
function uninstall(data, reason) {}

function startup(data, reasonCode) {
  dump("sslvc: startup\n");
  copyPref(currentPrefName, activePrefName);
}
function shutdown(data, reasonCode) {
  dump("sslvc: shutdown\n");
  copyPref(activePrefName, currentPrefName);
  copyPref(oldPrefName, activePrefName);
}
