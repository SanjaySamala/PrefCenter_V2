// jQuery.sap.declare("model.formatter");
sap.ui.define([], function() {
	"use strict";

	return {

// model.formatter = {
	formatVisible: function(val) {
		var sResult;
		if (val === "X") {
			return "true";
			sResult = "true";
			return sResult;
		} else {
			return "false";
			sResult = "false";
			return sResult;
		}

	},
	source: function(Src) {
		if (Src === "0") {
			return "sap-icon://building"; //Address
		}
		if (Src === "1") {
			return "sap-icon://phone"; //Telephone;
		}
		if (Src === "2") {
			return "sap-icon://iphone"; //Mobile or SMS
		}
		if (Src === "3") {
			return "sap-icon://email"; //Email
		}
		if (Src === "4") {
			return "sap-icon://fax-machine"; //Fax;
		}
	}
// };
	};

});