/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Training/Training/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});