sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ZPREFCNTR_v2.controller.Search", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZPREFCNTR_v2.view.Search
		 */
		onInit: function () {

		},

		onSearch1: function (oEvent) {
			var oBpCa = this.getView().byId("businessPartnerIdInput").getValue();
			if (oBpCa.trim().length === 10 || oBpCa.trim().length === 12) {
				this.getView().getModel("oGlobalModel").setProperty("/bpCa", oBpCa.trim());
				this.getOwnerComponent().getRouter().navTo("View1");
			} else {
				sap.m.MessageToast.show("Please enter a valid BP/CA number");
			}
		},

		validateBpCa: function (oEvent) {
			var enteredvalue = oEvent.getParameters().value;
			var numericvalue = Number(enteredvalue);
			if (!(!(isNaN(numericvalue)) && (numericvalue > 0) && !(enteredvalue.includes(".")))) {
				oEvent.getSource().setValue(enteredvalue.substr(0, enteredvalue.length - 1));
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ZPREFCNTR_v2.view.Search
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ZPREFCNTR_v2.view.Search
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ZPREFCNTR_v2.view.Search
		 */
		//	onExit: function() {
		//
		//	}

	});

});