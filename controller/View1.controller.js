var search_ca;
var org_bp;
var email_count;
var no_email;
var err_pref;
var error_flg;
var seq_no;
var show_alert;
var Fpref;
var FalertsNew;
var def_pref;
var prev_bp;
var pref_path_org;
// var ca_bp_data_exits;
jQuery.sap.require("ZPREFCNTR_v2.model.formatter");
sap.ui.define(['sap/m/Token', 'sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/m/MessageToast', 'sap/m/MessageBox',
		'sap/ui/core/Fragment', 'sap/ui/model/Filter'
	],
	function (Token, Controller, JSONModel, MessageToast, MessageBox, Fragment, Filter) {
		"use strict";
		//Test by Hemant
		// var time1=[this.getView().byId("TM1"),
		// this.getView().byId("TM2"),
		// this.getView().byId("TML1")];
		// // time1.push(this.getView().byId("TM1"));
		// // time1.push(this.getView().byId("TM2"));
		// // time1.push(this.getView().byId("TML1"));

		// var time2=[this.getView().byId("VM1"),
		// this.getView().byId("VM2"),
		// this.getView().byId("VML1")];
		// // time2.push(this.getView().byId("VM1"));
		// // time2.push(this.getView().byId("VM2"));
		// // time2.push(this.getView().byId("VML1"));

		return Controller.extend("ZPREFCNTR_v2.controller.View1", {
			data_saved: null,
			onInit: function () {
				search_ca = "";
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData("model/Objects.json");
				this.getView().byId("combo").setModel(oModel);

				var oModel1 = new sap.ui.model.json.JSONModel();
				oModel1.loadData("model/Objects1.json");
				this.getView().byId("Days").setModel(oModel1);

				// var rg1 = this.getView().byId("RG1");
				// var rg2 = this.getView().byId("RG2");
				// var box1 = this.getView().byId("TMB");
				// var box2 = this.getView().byId("VMB");
				// this.getView().byId("FIX").setVisible(true);

				this.getView().byId("Toggle2").setState(false);
				this.getView().byId("Toggle1").setState(false);
				this.getView().byId("defPref").setText("Turn Default Preferences ON");
				this.getView().byId("BP_Label").setText("Turn BP Preferences ON");

				// rg1.setSelectedIndex(0);
				// rg1.setVisible(false);
				// box1.setVisible(false);
				// rg2.setSelectedIndex(0);

				// box2.setVisible(false);  VM Meeded
				// rg2.setVisible(false);	VM Needed

				// tm1.setValue(new Date());
				// tm2.setValue(new Date());
				// vm1.setValue(new Date());
				// vm2.setValue(new Date());
				this.getView().byId("Back").setVisible(false);
				this.getView().byId("ALL").setVisible(false);
				//Start of changes by Sanjay Samala - Commented to enable editing on click of Edit button
				// this.getView().byId("adrs").setEditable(false);
				//End of Changes
				this.getView().byId("PL4").setVisible(false);
				// this.getView().byId("CD").setVisible(false);
				this.getView().byId("PR").setVisible(false);
				this.getView().byId("AL").setVisible(false);
				this.getView().byId("contData").setVisible(false);

				// this.getView().byId("FIX").setVisible(true);

				// Get default preferences
				var oManifestEntry2 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_GET_PREFERENCES_SRV.uri;
				var oModel2 = new sap.ui.model.odata.ODataModel(oManifestEntry2, {
					json: true,
					loadMetadataAsync: true
				});

				oModel2.read("/DefaultPrefSet", {
					async: false,
					success: function (data) {
						def_pref = data.results;
					},

					error: function (error) {
						// var sMessage = JSON.parse(error.response.body);
						var sMessage;
						// sap.m.MessageBox.show(sMessage.error.message.value, {
						// 	icon: "ERROR",
						// 	title: "Message",
						// 	styleClass: "Message",
						// 	actions: [sap.m.MessageBox.Action.OK],
						// 	onClose: function(oAction) {}
						// });
					}
				});

				this.getView().setModel(new JSONModel({
					sBpCa: "",
					sColor: "",
					sIcon: ""
				}), "oBpCaModel");

			},

			// Start of change by Hemant, Handle Add phone button

			AddPhone: function () {
				//Load fragment here
				var oView = this.getView();

				if (!this.byId("AddPhoneDialog")) {
					Fragment.load({
						id: oView.getId(), // This id is defined in fragment and should be matching for the call
						name: "ZPREFCNTR_v2.Fragments.AddPhone",
						controller: this // THis is important, controller
					}).then(function (oDialog) {
						// connect dialog to the root view of this component (models, lifecycle)
						oView.addDependent(oDialog); //add dependent is necessary 
						oDialog.open();
					});
				} else {
					this.byId("AddPhoneDialog").open();
				}

			},

			//User clicks on save
			SaveDialog: function () {

			},
			//User clicks on cancel
			CloseDialog: function () {
				this.byId("AddPhoneDialog").close();
			},
			// End of change by Hemant, Handle Add phone button	

			TMToggle: function () {
				var box = this.getView().byId("TMB");
				var grp = this.getView().byId("RG1");
				// this.getView().byId("RG2").setSelectedIndex(1);
				// if (evt.getSource().getState() === true ) {
				// if (this.getView().byId("TM_TOGGLE").getState() === true) {
				if (grp.getSelectedIndex() === 0) {
					box.setVisible(false);
				} else {
					box.setVisible(true);
				}

				grp.setVisible(true);
				// }
				// else {
				// 	box.setVisible(false);
				// 	grp.setVisible(false);
				// }
				this.TextMsg();

			},

			// VMToggle: function() {
			// 	var box = this.getView().byId("VMB");
			// 	var grp = this.getView().byId("RG2");

			// 	// if (evt.getSource().getState() === true ) {
			// 	if (this.getView().byId("VM_TOGGLE").getState() === true) {
			// 		if (grp.getSelectedIndex() === 0) {
			// 			box.setVisible(false);
			// 		} else {
			// 			box.setVisible(true);
			// 		}

			// 		grp.setVisible(true);
			// 	} else {
			// 		box.setVisible(false);
			// 		grp.setVisible(false);
			// 	}
			// 	this.VoiceMsg();
			// },

			TextMsg: function () {
				var SelectedBtn = this.getView().byId("RG1").getSelectedButton();
				// var rg2 = this.getView().byId("RG2").getSelectedButton(); VM Needed
				// evt.getSource().getSelectedButton();
				var box = this.getView().byId("TMB");

				if (SelectedBtn.getText() === "Anytime") {
					// if(rg2.getText() === "Between"){this.getView().byId("FIX").setVisible(true);}
					// else{ this.getView().byId("FIX").setVisible(false); }
					// this.getView().byId("FIX").setVisible(true); VM Needed
					box.setVisible(false);
					this.getView().byId("TM1").setVisible(false);
					this.getView().byId("TM2").setVisible(false);
					this.getView().byId("TML1").setVisible(false);
				} else {
					box.setVisible(true);
					// if(rg2.getText() === "Between"){this.getView().byId("FIX").setVisible(true);}
					// else{ this.getView().byId("FIX").setVisible(false); }
					// this.getView().byId("FIX").setVisible(false);
					// this.getView().byId("FIX").setVisible(true);
					// this.getView().byId("FIX2").setVisible(true);
					// this.getView().byId("FIX").setVisible(true);VM Needed
					this.getView().byId("TM1").setVisible(true);
					this.getView().byId("TM2").setVisible(true);
					this.getView().byId("TML1").setVisible(true);
				}
			},

			// VoiceMsg: function() {
			// 	var SelectedBtn = this.getView().byId("RG2").getSelectedButton();
			// 	var rg1 = this.getView().byId("RG1").getSelectedButton();
			// 	// evt.getSource().getSelectedButton();
			// 	var box = this.getView().byId("VMB");
			// 	if (SelectedBtn.getText() === "Anytime") {
			// 		box.setVisible(false);

			// 		// if(rg1.getText() === "Between"){this.getView().byId("FIX").setVisible(false);}
			// 		// else{ this.getView().byId("FIX").setVisible(true); }
			// 		this.getView().byId("FIX").setVisible(true);
			// 		this.getView().byId("VM1").setVisible(false);
			// 		this.getView().byId("VM2").setVisible(false);
			// 		this.getView().byId("VML1").setVisible(false);
			// 	} else {
			// 		box.setVisible(true);
			// 		if(rg1.getText() === "Between"){this.getView().byId("FIX").setVisible(false);}
			// 		else{ this.getView().byId("FIX").setVisible(true); }
			// 		this.getView().byId("VM1").setVisible(true);
			// 		this.getView().byId("VM2").setVisible(true);
			// 		this.getView().byId("VML1").setVisible(true);
			// 	}
			// },

			CA_Def: function () {
				var oTable = this.getView().byId("CA");
				var items = oTable.getItems();
				var ca_list = [];
				var oModel_Ca = new sap.ui.model.json.JSONModel();
				for (var i = 0; i < items.length; i++) { // CA List
					var data1 = items[i].getBindingContext('CA_LIST').oModel.oData[i];
					if (data1.DEF_PREF_FLAG === true) {
						data1.DEF_PREF_TXT = "Turn Default Preferences OFF";
						data1.BP_PREF_TXT = "Turn BP Preferences ON";
						data1.BP_PREF_FLAG = false;
					}
					if (data1.DEF_PREF_FLAG === false) {
						data1.DEF_PREF_TXT = "Turn Default Preferences ON";
						// data1.BP_PREF_TXT= "Turn BP Preferences OFF";
						// data1.BP_PREF_FLAG = true;
					}
					ca_list.push(data1);
				}
				oModel_Ca.setData(ca_list);
				this.getView().byId("CA").setModel(oModel_Ca, "CA_LIST");

			},

			CA_bpref: function (oEvent) {
				var oTable = this.getView().byId("CA");
				var items = oTable.getItems();
				var ca_list = [];
				var oModel_Ca = new sap.ui.model.json.JSONModel();
				for (var i = 0; i < items.length; i++) { // CA List
					var data1 = items[i].getBindingContext('CA_LIST').oModel.oData[i];
					if (data1.BP_PREF_FLAG === true) {
						data1.BP_PREF_TXT = "Turn BP Preferences OFF";
						data1.DEF_PREF_TXT = "Turn Default Preferences ON";
						data1.DEF_PREF_FLAG = false;
					}
					if (data1.BP_PREF_FLAG === false) {
						data1.BP_PREF_TXT = "Turn BP Preferences ON";
						// data1.DEF_PREF_TXT= "Turn Default Preferences OFF";
						// data1.DEF_PREF_FLAG = true;
					}
					ca_list.push(data1);
				}
				oModel_Ca.setData(ca_list);
				this.getView().byId("CA").setModel(oModel_Ca, "CA_LIST");

			},

			DefaultToggle: function () {
				var oTable = this.getView().byId("PL1");
				var oModel = new sap.ui.model.json.JSONModel();
				var oToggle = this.getView().byId("Toggle1");
				var status = oToggle.getState();
				var pref1 = [];

				if (status === true) {
					this.getView().byId("Toggle2").setState(false);
					this.getView().byId("BP_Label").setText("Turn BP Preferences ON");
					this.getView().byId("defPref").setText("Turn Default Preferences OFF");

					for (var i = 0; i < def_pref.length; i++) {
						var obj = {};
						obj.CA_BP_NUM = def_pref[i].CaBpNum;
						obj.ADDRESS_NUM = def_pref[i].AddressNum;
						obj.PREF_ID = def_pref[i].PrefId;
						obj.CONSNUMBER = def_pref[i].Consnumber;
						obj.PREF_TEXT = def_pref[i].PrefText;
						// obj.EMAIL_FLAG = def_pref[i].EmailFlag;
						// obj.MOBILE_FLAG = def_pref[i].SmsFlag;
						// obj.POSTAL_FLAG = def_pref[i].PostFlag;
						obj.def_email = false;
						obj.def_sms = false;
						obj.def_post = false;

						if (def_pref[i].EmailFlag === "X" || def_pref[i].EmailFlag === true) {
							obj.pemail_flag = true;
						} else {
							obj.pemail_flag = false;
						}
						if (def_pref[i].SmsFlag === "X" || def_pref[i].SmsFlag === true) {
							obj.psms_flag = true;
						} else {
							obj.psms_flag = false;
						}
						if (def_pref[i].PostFlag === "X" || def_pref[i].PostFlag === true) {
							obj.ppost_flag = true;
						} else {
							obj.ppost_flag = false;
						}

						if (def_pref[i].DefaultComm === "E") {
							obj.EMAIL_FLAG = true;
						}
						if (def_pref[i].DefaultComm === "S") {
							obj.MOBILE_FLAG = true;
						}
						if (def_pref[i].DefaultComm === "P") {
							obj.POSTAL_FLAG = true;
						}

						pref1.push(obj);
						this.pref1 = pref1;
					}
					oModel.setData(pref1);
					oTable.setModel(oModel, "PREFERENCE");

					// sap.m.MessageToast.show("Default user preferences - ON");
				} else {
					this.getView().byId("defPref").setText("Turn Default Preferences ON");
					this.getView().byId("obj_noBpPref").setVisible(false);
					// this.getView().byId("BP_Label").setText("Turn BP Preferences OFF");
					var that = this;
					var oManifestEntry2 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_GET_ADDRESS_SRV.uri;
					var oModel2 = new sap.ui.model.odata.ODataModel(oManifestEntry2, {
						json: true,
						loadMetadataAsync: true
					});

					var sPath = "/DefaultPreferenceOffSet?$filter=BpCa eq '" + this.getView().byId("BP").getValue() + "' and MasterAddrNum eq '" +
						this.adrNum + "'";

					oModel2.read(sPath, {
						async: false,
						success: function (data) {
							that.existingPrefs = data.results;
						},
						error: function (error) {
							var sMessage = JSON.parse(error.response.body);
							sap.m.MessageBox.show(sMessage.error.message.value, {
								icon: "ERROR",
								title: "Message",
								styleClass: "Message",
								actions: [sap.m.MessageBox.Action.OK],
								onClose: function (oAction) {}
							});
						}

					});

					if (this.existingPrefs.length > 0) {
						var aResults = this.existingPrefs;
						var prefFinalData = [];
						for (var j = 0; j < aResults.length; j++) {
							var obj1 = {};
							obj1.CA_BP_NUM = aResults[j].BpCa;
							obj1.ADDRESS_NUM = aResults[j].AddressNum;
							obj1.PREF_ID = aResults[j].PrefId;
							obj1.CONSNUMBER = aResults[j].Consnumber;
							obj1.PREF_TEXT = aResults[j].PrefText;
							obj1.EMAIL_FLAG = aResults[j].EmailFlag;
							obj1.MOBILE_FLAG = aResults[j].MobileFlag;
							obj1.POSTAL_FLAG = aResults[j].PostalFlag;
							obj1.pemail_flag = aResults[j].PemailFlag;
							obj1.psms_flag = aResults[j].PsmsFlag;
							obj1.ppost_flag = aResults[j].PpostFlag;
							obj1.def_email = false;
							obj1.def_sms = false;
							obj1.def_post = false;
							obj1.text = "";

							if (aResults[j].EmailFlag === "X" || aResults[j].EmailFlag === true) {
								email_count = email_count + 1;
							}
							if (aResults[j].PemailFlag === "X" || aResults[j].PemailFlag === true) {
								obj1.pemail_flag = true;
							} else {
								obj1.pemail_flag = false;
							}
							if (aResults[j].PsmsFlag === "X" || aResults[j].PsmsFlag === true) {
								obj1.psms_flag = true;
							} else {
								obj1.psms_flag = false;
							}
							if (aResults[j].PpostFlag === "X" || aResults[j].PpostFlag === true) {
								obj1.ppost_flag = true;
							} else {
								obj1.ppost_flag = false;
							}

							if (obj1.EMAIL_FLAG === "X" || obj1.EMAIL_FLAG === true) {
								obj1.EMAIL_FLAG = true;
							} else {
								obj1.EMAIL_FLAG = false;
							}
							if (obj1.MOBILE_FLAG === "X" || obj1.MOBILE_FLAG === true) {
								obj1.MOBILE_FLAG = true;
							} else {
								obj1.MOBILE_FLAG = false;
							}
							if (obj1.POSTAL_FLAG === "X" || obj1.POSTAL_FLAG === true) {
								obj1.POSTAL_FLAG = true;
							} else {
								obj1.POSTAL_FLAG = false;
							}

							if (aResults[j].PemailFlag === "X" || aResults[j].PemailFlag === true) {
								obj1.def_email = true;
							} else {
								obj1.def_email = false;
							}
							if (aResults[j].PsmsFlag === "X" || aResults[j].PsmsFlag === true) {
								obj1.def_sms = true;
							} else {
								obj1.def_sms = false;
							}
							if (aResults[j].PpostFlag === "X" || aResults[j].PpostFlag === true) {
								obj1.def_post = true;
							} else {
								obj1.def_post = false;
							}

							if (this.getView().byId("Email").getValue() === "") {
								obj1.def_email = false;
							}
							if (this.getView().byId("SMS").getValue() === "") {
								obj1.def_sms = false;
							}

							if (aResults[j].EmailIconFlg === true || aResults[j].EmailIconFlg === "X") {
								obj1.EMAIL_ICON_FLG = "X";
							} else {
								obj1.EMAIL_ICON_FLG = "";
							}
							if (aResults[j].MobileIconFlg === true || aResults[j].MobileIconFlg === "X") {
								obj1.MOBILE_ICON_FLG = "X";
							} else {
								obj1.MOBILE_ICON_FLG = "";
							}
							if (aResults[j].PostalIconFlg === true || aResults[j].PostalIconFlg === "X") {
								obj1.POSTAL_ICON_FLG = "X";
							} else {
								obj1.POSTAL_ICON_FLG = "";
							}
							prefFinalData.push(obj1);
						}

						oModel.setData(prefFinalData);

					} else {
						if (Fpref === undefined) {
							// oModel.setData(undefined);
							for (var i = 0; i < this.pref1.length; i++) {
								if (this.pref1[i].pemail_flag === true) {
									this.pref1[i].def_email = true;
								} else {
									this.pref1[i].def_email = false;
								}
								if (this.pref1[i].psms_flag === true) {
									this.pref1[i].def_sms = true;
								} else {
									this.pref1[i].def_sms = false;
								}
								if (this.pref1[i].ppost_flag === true) {
									this.pref1[i].def_post = true;
								} else {
									this.pref1[i].def_post = false;
								}
								if (this.getView().byId("Email").getValue() === "") {
									this.pref1[i].def_email = false;
								}
								if (this.getView().byId("SMS").getValue() === "") {
									this.pref1[i].def_sms = false;
								}
								// Fpref[i].EMAIL_FLAG = "";
								// Fpref[i].MOBILE_FLAG = "";
								// Fpref[i].POSTAL_FLAG = "";

							}
							oModel.setData(this.pref1);
						} else {
							for (var i = 0; i < Fpref.length; i++) {
								if (Fpref[i].pemail_flag === true) {
									Fpref[i].def_email = true;
								} else {
									Fpref[i].def_email = false;
								}
								if (Fpref[i].psms_flag === true) {
									Fpref[i].def_sms = true;
								} else {
									Fpref[i].def_sms = false;
								}
								if (Fpref[i].ppost_flag === true) {
									Fpref[i].def_post = true;
								} else {
									Fpref[i].def_post = false;
								}
								if (this.getView().byId("Email").getValue() === "") {
									Fpref[i].def_email = false;
								}
								if (this.getView().byId("SMS").getValue() === "") {
									Fpref[i].def_sms = false;
								}
								// Fpref[i].EMAIL_FLAG = "";
								// Fpref[i].MOBILE_FLAG = "";
								// Fpref[i].POSTAL_FLAG = "";

							}
							oModel.setData(Fpref);
						}
						// }

						// sap.m.MessageToast.show("Default user preferences - OFF");
					}
					oTable.setModel(oModel, "PREFERENCE");
				}
			},

			BPToggle: function (oEvent) {
				var oToggle = this.getView().byId("Toggle2");
				var status = oToggle.getState();
				var oManifestEntry = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_GET_PREFERENCES_SRV.uri;
				var oModel = new sap.ui.model.odata.ODataModel(oManifestEntry, {
					json: true,
					loadMetadataAsync: true
				});
				var bp = this.getView().byId("BP").getValue();

				var oTab_adrnr = this.getView().byId("T1");
				var adr_items = oTab_adrnr.getItems();
				// var address = adr_items[0].getBindingContext('POSTADR').oModel.oData[0];
				var address = this.getView().getModel("POSTADR").getData()[0];

				var path = "/CustPrefSet?$filter=CA_BP_NUM eq '" + bp + "' and ADDRESS_NUM eq '" + address.AddressNumber +
					"' and CONSNUMBER eq '" + seq_no + "'";
				// var path = "/CustPrefSet?$filter=ImInput eq '" + bp + "'";
				var pref = [];
				var that = this;

				if (status === true) {
					this.getView().byId("Toggle1").setState(false);
					this.getView().byId("BP_Label").setText("Turn BP Preferences OFF");
					this.getView().byId("defPref").setText("Turn Default Preferences ON");
					// sap.m.MessageToast.show("Use Business Partner preferences");
					// Get BP preferences
					oModel.read(path, {
						async: false,
						success: function (data) {
							// if(data.results.length > 1){ca_bp_data_exits = "X";}
							for (var i = 0; i < data.results.length; i++) {
								var obj = {};
								obj.CA_BP_NUM = data.results[i].CA_BP_NUM;
								obj.ADDRESS_NUM = data.results[i].ADDRESS_NUM;
								obj.PREF_ID = data.results[i].PREF_ID;
								obj.CONSNUMBER = data.results[i].CONSNUMBER;
								obj.PREF_TEXT = data.results[i].PREF_TEXT;
								// Start of change by Hemant
								//obj.EMAIL_FLAG = data.results[i].EMAIL_FLAG;
								//obj.MOBILE_FLAG = data.results[i].MOBILE_FLAG;
								//obj.POSTAL_FLAG = data.results[i].POSTAL_FLAG;
								if (data.results[i].EMAIL_FLAG) {
									obj.EMAIL_FLAG = true;
								} else {
									obj.EMAIL_FLAG = false;
								}
								if (data.results[i].MOBILE_FLAG) {
									obj.MOBILE_FLAG = true;
								} else {
									obj.MOBILE_FLAG = false;
								}
								if (data.results[i].POSTAL_FLAG) {
									obj.POSTAL_FLAG = true;
								} else {
									obj.POSTAL_FLAG = false;
								}
								// End of change by Hemant
								obj.pemail_flag = data.results[i].pemail_flag;
								obj.psms_flag = data.results[i].psms_flag;
								obj.ppost_flag = data.results[i].ppost_flag;
								obj.def_email = false;
								obj.def_sms = false;
								obj.def_post = false;
								obj.EMAIL_ICON_FLG = "";
								obj.MOBILE_ICON_FLG = "";
								obj.POSTAL_ICON_FLG = "";

								if (data.results[i].EMAIL_ICON_FLG === true || data.results[i].EMAIL_ICON_FLG === "X") {
									obj.EMAIL_ICON_FLG = "X";
								} else {
									obj.EMAIL_ICON_FLG = "";
								}

								if (data.results[i].MOBILE_ICON_FLG === true || data.results[i].MOBILE_ICON_FLG === "X") {
									obj.MOBILE_ICON_FLG = "X";
								} else {
									obj.MOBILE_ICON_FLG = "";
								}

								if (data.results[i].POSTAL_ICON_FLG === true || data.results[i].POSTAL_ICON_FLG === "X") {
									obj.POSTAL_ICON_FLG = "X";
								} else {
									obj.POSTAL_ICON_FLG = "";
								}

								pref.push(obj);
							}

							var oModel_Temp = new sap.ui.model.json.JSONModel();
							oModel_Temp.setData(pref);
							that.caPref = oModel_Temp;

							// Preference
							var oTable = that.getView().byId("PL1");
							oTable.setModel(oModel_Temp, "PREFERENCE");

						},

						error: function (error) {
							var sMessage = JSON.parse(error.response.body);
							sap.m.MessageBox.show(sMessage.error.message.value, {
								icon: "ERROR",
								title: "Message",
								styleClass: "Message",
								actions: [sap.m.MessageBox.Action.OK],
								onClose: function (oAction) {}
							});
						}
					});
					if (pref.length === 0) {
						oToggle.setState(false);
						this.getView().byId("Toggle1").setState(true);
						if (this.getView().byId("Toggle1").getState()) {
							this.getView().byId("obj_noBpPref").setVisible(true);
						}

						this.DefaultToggle();
					} else {
						this.getView().byId("obj_noBpPref").setVisible(false);
						var that = this;

						if (status) {
							//Calling the BP preference On method to update in Backend
							var oManifestEntry1 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_GET_ADDRESS_SRV.uri;

							var oModel1 = new sap.ui.model.odata.ODataModel(oManifestEntry1, {
								json: true,
								loadMetadataAsync: true
							});
							var sPath = "/BpPreferenceOnSet?$filter=BpCa eq '" + bp + "' and MasterAddrNum eq '" + this.adrNum + "'";
							sap.ui.core.BusyIndicator.show();
							oModel1.read(sPath, {
								async: false,
								success: function (data) {
									that.getPreferenceIconsData();
									sap.ui.core.BusyIndicator.hide();
								},
								error: function (error) {
									sap.ui.core.BusyIndicator.hide();
									var sMessage = JSON.parse(error.response.body);
									sap.m.MessageBox.show(sMessage.error.message.value, {
										icon: "ERROR",
										title: "Message",
										styleClass: "Message",
										actions: [sap.m.MessageBox.Action.OK],
										onClose: function (oAction) {}
									});
								}

							});
						}

					}
				} else {
					this.getView().byId("BP_Label").setText("Turn BP Preferences ON");
					// this.getView().byId("defPref").setText("Turn Default Preferences OFF");
					// sap.m.MessageToast.show("Use Account preferences");
					var oModel_Temp = new sap.ui.model.json.JSONModel();
					if (Fpref === undefined) {
						// oModel_Temp.setData(undefined);
						this.caPref = this.caPref.getData();
						for (var i = 0; i < this.caPref.length; i++) {
							if (this.caPref[i].pemail_flag === true || this.caPref[i].pemail_flag === "X") {
								this.caPref[i].def_email = true;
							} else {
								this.caPref[i].def_email = false;
							}
							if (this.caPref[i].psms_flag === true || this.caPref[i].psms_flag === "X") {
								this.caPref[i].def_sms = true;
							} else {
								this.caPref[i].def_sms = false;
							}
							if (this.caPref[i].ppost_flag === true || this.caPref[i].ppost_flag === "X") {
								this.caPref[i].def_post = true;
							} else {
								this.caPref[i].def_post = false;
							}
							if (this.getView().byId("Email").getValue() === "") {
								this.caPref[i].def_email = false;
							}
							if (this.getView().byId("SMS").getValue() === "") {
								this.caPref[i].def_sms = false;
							}
							if (this.caPref[i].EMAIL_ICON_FLG === true || this.caPref[i].EMAIL_ICON_FLG === "X") {
								this.caPref[i].EMAIL_ICON_FLG = "X";
							} else {
								this.caPref[i].EMAIL_ICON_FLG = "";
							}

							if (this.caPref[i].MOBILE_ICON_FLG === true || this.caPref[i].MOBILE_ICON_FLG === "X") {
								this.caPref[i].MOBILE_ICON_FLG = "X";
							} else {
								this.caPref[i].MOBILE_ICON_FLG = "";
							}

							if (this.caPref[i].POSTAL_ICON_FLG === true || this.caPref[i].POSTAL_ICON_FLG === "X") {
								this.caPref[i].POSTAL_ICON_FLG = "X";
							} else {
								this.caPref[i].POSTAL_ICON_FLG = "";
							}
							// obj.EMAIL_ICON_FLG = "";
							// obj.MOBILE_ICON_FLG = "";
							// obj.POSTAL_ICON_FLG = "";
							// Fpref[i].EMAIL_FLAG = "";
							// Fpref[i].MOBILE_FLAG = "";
							// Fpref[i].POSTAL_FLAG = "";

						}
						oModel_Temp.setData(this.caPref);
					} else {
						oModel_Temp.setData(Fpref);
					}
					// Preference
					var oTable = that.getView().byId("PL1");
					oTable.setModel(oModel_Temp, "PREFERENCE");
				}
			},

			getPreferenceIconsData: function () {
				var oManifestEntry1 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_PREF_USERTRANSDATA_SRV.uri;
				var oModel1 = new sap.ui.model.odata.ODataModel(oManifestEntry1, {
					json: true,
					loadMetadataAsync: true
				});
				var bp = this.getView().byId("BP").getValue();
				var tempData = [];
				var pref = [];
				var path_pref = "/PrefUserDataSet?$filter=CA_BP_NUM eq '" + bp + "' and ADDRESS_NUM eq '" + this.adrNum +
					"' and CONSNUMBER eq '" + this.CONSNUMBER + "'";

				/*oModel1.read(path_pref, {
					async: false,
					success: function (data) {
						tempData = data.results;
					},
					error: function (error) {
						var sMessage = JSON.parse(error.response.body);
						sap.m.MessageBox.show(sMessage.error.message.value, {
							icon: "ERROR",
							title: "Message",
							styleClass: "Message",
							actions: [sap.m.MessageBox.Action.OK],
							onClose: function (oAction) {}
						});
					}
				});*/
				var inst_pref = this.getView().byId("PL1").getModel("PREFERENCE").getData();
				// var sFlag = "";
				if (tempData.length > 0) {
					for (var i = 0; i < inst_pref.length; i++) {
						// sFlag = "";
						for (var j = 0; j < tempData.length; j++) {
							var obj = {};
							obj.CA_BP_NUM = inst_pref[i].CA_BP_NUM;
							obj.ADDRESS_NUM = inst_pref[i].ADDRESS_NUM;
							obj.PREF_ID = inst_pref[i].PREF_ID;
							obj.CONSNUMBER = inst_pref[i].CONSNUMBER;
							obj.PREF_TEXT = inst_pref[i].PREF_TEXT;
							obj.EMAIL_FLAG = inst_pref[i].EMAIL_FLAG;
							obj.MOBILE_FLAG = inst_pref[i].MOBILE_FLAG;
							obj.POSTAL_FLAG = inst_pref[i].POSTAL_FLAG;
							obj.pemail_flag = inst_pref[i].pemail_flag;
							obj.psms_flag = inst_pref[i].psms_flag;
							obj.ppost_flag = inst_pref[i].ppost_flag;
							obj.def_email = false;
							obj.def_sms = false;
							obj.def_post = false;
							obj.text = "";

							if (inst_pref[i].EMAIL_FLAG === "X" || inst_pref[i].EMAIL_FLAG === true) {
								email_count = email_count + 1;
							}
							if (inst_pref[i].pemail_flag === "X" || inst_pref[i].pemail_flag === true) {
								obj.pemail_flag = true;
							} else {
								obj.pemail_flag = false;
							}
							if (inst_pref[i].psms_flag === "X" || inst_pref[i].psms_flag === true) {
								obj.psms_flag = true;
							} else {
								obj.psms_flag = false;
							}
							if (inst_pref[i].ppost_flag === "X" || inst_pref[i].ppost_flag === true) {
								obj.ppost_flag = true;
							} else {
								obj.ppost_flag = false;
							}

							if (obj.EMAIL_FLAG === "X" || obj.EMAIL_FLAG === true) {
								obj.EMAIL_FLAG = true;
							} else {
								obj.EMAIL_FLAG = false;
							}
							if (obj.MOBILE_FLAG === "X" || obj.MOBILE_FLAG === true) {
								obj.MOBILE_FLAG = true;
							} else {
								obj.MOBILE_FLAG = false;
							}
							if (obj.POSTAL_FLAG === "X" || obj.POSTAL_FLAG === true) {
								obj.POSTAL_FLAG = true;
							} else {
								obj.POSTAL_FLAG = false;
							}

							/*if (inst_pref[i].pemail_flag === "X" || inst_pref[i].pemail_flag === true) {
								obj.def_email = true;
							} else {
								obj.def_email = false;
							}
							if (inst_pref[i].psms_flag === "X" || inst_pref[i].psms_flag === true) {
								obj.def_sms = true;
							} else {
								obj.def_sms = false;
							}
							if (inst_pref[i].ppost_flag === "X" || inst_pref[i].ppost_flag === true) {
								obj.def_post = true;
							} else {
								obj.def_post = false;
							}*/

							if (this.getView().byId("Email").getValue() === "") {
								obj.def_email = false;
							}
							if (this.getView().byId("SMS").getValue() === "") {
								obj.def_sms = false;
							}
							obj.EMAIL_ICON_FLG = "";
							obj.MOBILE_ICON_FLG = "";
							obj.POSTAL_ICON_FLG = "";

							if (inst_pref[i].PREF_ID === tempData[j].PREF_ID) {
								obj.EMAIL_ICON_FLG = tempData[j].EMAIL_ICON_FLG;
								obj.MOBILE_ICON_FLG = tempData[j].MOBILE_ICON_FLG;
								obj.POSTAL_ICON_FLG = tempData[j].POSTAL_ICON_FLG;
								// sFlag = "X";
								break;
							}

						}
						// if(sFlag === ""){
						pref.push(obj);
						// }

					}

				} else {
					pref = pref.concat(inst_pref);
				}
				// Fpref = pref;
				var oModel_Temp = new sap.ui.model.json.JSONModel();
				oModel_Temp.setData(pref);

				// Preference
				var oTable = this.getView().byId("PL1");
				oTable.setModel(oModel_Temp, "PREFERENCE");

				var oTab_adrnr = this.getView().byId("T1");
				var adr_items = oTab_adrnr.getItems();
				for (var j = 0; j < adr_items.length; j++) { // Comm. Data
					// var data2 = adr_items[j].getBindingContext('POSTADR').oModel.oData[j];
					var data2 = this.getView().getModel('POSTADR').getData()[j];
					if (data2.text === "Email" && data2.value === "") {
						no_email = "X";
					}
				}

				if (no_email === "X" && email_count > 0) { //"Email" is default preference, but if no email has been maintained
					sap.m.MessageBox.show("No Email maintained w.r.t preference chosen", {
						icon: sap.m.MessageBox.Icon.WARNING,
						title: "WARNING Message",
						actions: [sap.m.MessageBox.Action.OK]
					});
				}
			},

			SaveAll: function (evt) {
				// var oTable = this.getView().byId("T1");
				//Validation of Phone Number

				// var oTelephoneInp = oTable.getItems()[1].getCells()[2];
				// var oPhoneNumberInp = oTable.getItems()[2].getCells()[2];
				// var oEmailInp = oTable.getItems()[3].getCells()[2];

				var telephone = this.getView().getModel("POSTADR").getProperty("/1/value");
				var mobile = this.getView().getModel("POSTADR").getProperty("/2/value");
				var email = this.getView().getModel("POSTADR").getProperty("/3/value");

				var errorCount = 0;
				var errorMessages = [];
				var phnNumPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
				if (telephone !== "" && !phnNumPattern.test(telephone)) {
					// oTelephoneInp.setValueState("Error");
					// oTelephoneInp.setValueStateText("Invalid Telephone!");

					this.getView().byId("id_telephone").setValueState("Error");
					this.getView().byId("id_telephone").setValueStateText("Invalid Telephone");

					//return false;
					errorMessages.push("Please maintain valid Telephone number");
					errorCount = errorCount + 1;
				}
				if (mobile !== "" && !phnNumPattern.test(mobile)) {
					// oPhoneNumberInp.setValueState("Error");
					// oPhoneNumberInp.setValueStateText("Invalid Mobile!");
					errorMessages.push("Please maintain valid Mobile number");

					this.getView().byId("id_mobile").setValueState("Error");
					this.getView().byId("id_mobile").setValueStateText("Invalid Mobile");

					//return false;
					errorCount = errorCount + 1;
				}

				var mailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

				if (!mailPattern.test(email)) {
					// oEmailInp.setValueState("Error");
					// oEmailInp.setValueStateText("Invalid Email!");

					this.getView().byId("id_email").setValueState("Error");
					this.getView().byId("id_email").setValueStateText("Invalid Email");

					//return false;
					errorMessages.push("Please maintain valid Email");
					errorCount = errorCount + 1;
				}

				if (errorCount > 0) {
					sap.m.MessageToast.show(errorMessages.join("\n"));
					return false;
				}

				this.PrefSave(evt);
				if (err_pref === " ") {
					// var post_adr = this.getView().byId("T1");
					// var ca_data = post_adr.getModel("POSTADR").getData();
					var ca_data = this.getView().getModel("POSTADR").getData();
					if (ca_data[0].ExBpOrCaFlag === "BP") {
						this.SaveCA(evt);
					}
					this.SaveAlertsNew(evt);
					this.AlertsSave(evt);
					this.commDataSave(evt);
					this.resetPref(evt);
				}
			},

			PrefSave: function (evt) {
				var sequence;
				var msg = " ";
				var pref = [];
				var obj = {};
				var email, mobile, postal, ppost_flag, pemail_flag, psms_flag;
				var sequence;
				var oTable = this.getView().byId("PL1");
				var items = oTable.getItems();
				err_pref = " ";

				for (var i = 0; i < items.length; i++) { // Prefernces
					var data1 = items[i].getBindingContext('PREFERENCE').oModel.oData[i];
					if ((data1.EMAIL_FLAG === "" || data1.EMAIL_FLAG === false) && (data1.MOBILE_FLAG === "" || data1.MOBILE_FLAG === false) && (
							data1
							.POSTAL_FLAG === "" || data1.POSTAL_FLAG === false)) {
						err_pref = "X";
						msg = msg + data1.PREF_TEXT + ",";
					}
				}

				if (err_pref === "X") {
					sap.m.MessageBox.show("Enter atleast one preference for" + msg, {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "Error Message",
						actions: [sap.m.MessageBox.Action.OK]
					});
				}
				if (no_email === "X" && email_count > 0) { //"Email" is default preference, but if no email has been maintained
					err_pref = "X";
					sap.m.MessageBox.show("No Email maintained w.r.t preference chosen" + msg, {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "Error Message",
						actions: [sap.m.MessageBox.Action.OK]
					});
				} else {

					var oManifestEntry1 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_PREF_USERTRANSDATA_SRV.uri;
					var oModel1 = new sap.ui.model.odata.ODataModel(oManifestEntry1, {
						json: true,
						loadMetadataAsync: true
					});
					var that = this;
					var bp = this.getView().byId("BP").getValue();
					var oTab_adrnr = this.getView().byId("T1");
					var adr_items = oTab_adrnr.getItems();
					// var address = adr_items[0].getBindingContext('POSTADR').oModel.oData[0];
					var address = this.getView().getModel('POSTADR').getData()[0];

					if (seq_no === "") {
						sequence = "000";
					} else {
						sequence = seq_no;
					}

					if (typeof (seq_no) === "undefined") {
						sequence = "000";
					}

					for (var i = 0; i < items.length; i++) {
						var data = items[i].getBindingContext('PREFERENCE').oModel.oData[i];

						if (data.EMAIL_FLAG === true || (data.EMAIL_FLAG === "X")) {
							email = "X";
						} else {
							email = "";
						}
						if (data.MOBILE_FLAG === true || (data.MOBILE_FLAG === "X")) {
							mobile = "X";
						} else {
							mobile = "";
						}
						if (data.POSTAL_FLAG === true || (data.POSTAL_FLAG === "X")) {
							postal = "X";
						} else {
							postal = "";
						}
						if (data.pemail_flag === true || data.pemail_flag === "X") {
							pemail_flag = "X";
						} else {
							pemail_flag = "";
						}
						if (data.psms_flag === true || data.psms_flag === "X") {
							psms_flag = "X";
						} else {
							psms_flag = "";
						}
						if (data.ppost_flag === true || data.ppost_flag === "X") {
							ppost_flag = "X";
						} else {
							ppost_flag = "";
						}

						obj = {
							"CA_BP_NUM": bp,
							"ADDRESS_NUM": address.AddressNumber,
							"PREF_ID": data.PREF_ID,
							"CONSNUMBER": sequence,
							"PREF_TEXT": data.PREF_TEXT,
							"EMAIL_FLAG": email,
							"MOBILE_FLAG": mobile,
							"POSTAL_FLAG": postal,
							"pemail_flag": pemail_flag,
							"psms_flag": psms_flag,
							"ppost_flag": ppost_flag
								/*,
															"EMAIL_CP_ONLY": data.EMAIL_ICON_FLG,
															"MOBILE_CP_ONLY": data.MOBILE_ICON_FLG,
															"POSTAL_CP_ONLY": data.POSTAL_ICON_FLG*/
						};
						pref.push(obj);

						if (seq_no === "") {
							sequence = "000";
						} else {
							sequence = seq_no;
						}

						if (typeof (seq_no) === "undefined") {
							sequence = "000";
						}

						oModel1.update("/PrefUserDataSet(CA_BP_NUM='" + bp + "',ADDRESS_NUM='" + address.AddressNumber + "',PREF_ID='" + data.PREF_ID +
							"',CONSNUMBER='" + sequence + "')",
							obj, {
								async: true,
								// method: "POST",
								success: function (oData, oResponse) {
									// var oToggle = that.getView().byId("Toggle1");
									// oToggle.setState(false);

									/*	var message = "Data saved successfully";
										MessageToast.show(message);*/
									that.data_saved = "X";

								},
								error: function (oError) {
									// var err = JSON.parse(oError.responseText);
									// var msg;
									// if (err.error.message.value === "") {
									// 	msg = "Failure - OData Service could not be called. Please check the Network Tab at Debug.";
									// } else {
									// 	msg = err.error.message.value;
									// }
									// jQuery.sap.require("sap.m.MessageBox");

									// sap.m.MessageBox.show(msg, {
									// 	icon: sap.m.MessageBox.Icon.ERROR,
									// 	title: "Error Message",
									// 	actions: [sap.m.MessageBox.Action.OK]
									// });
								}
							});
					}
				}
			},
			SaveCA: function (evt) {

				var msg = " ";
				var obj = {};
				var oManifestEntry1 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_PREF_BPDTLS_SRV.uri;
				var oModel = new sap.ui.model.odata.ODataModel(oManifestEntry1, {
					json: true,
					loadMetadataAsync: true
				});
				var that = this;
				var bp = this.getView().byId("BP").getValue();
				var oTab = this.getView().byId("CA");
				var ca_data = oTab.getModel("CA_LIST").getData();

				for (var i = 0; i < ca_data.length; i++) {

					// if(ca_data[i].E_FLAG === true){ ca_data[i].E_FLAG = "X";}
					// else{ca_data[i].E_FLAG = "";}

					var obj = {};
					obj.CA_BP_NUM = ca_data[i].CA_BP_NUM;
					obj.E_FLAG = "";
					obj.DEF_PREF_FLAG = ca_data[i].DEF_PREF_FLAG.toString();
					obj.BP_PREF_FLAG = ca_data[i].BP_PREF_FLAG.toString();
					// obj.DEF_PREF_FLAG = "'"+ca_data[i].DEF_PREF_FLAG+"'";
					// obj.BP_PREF_FLAG = "'"+ca_data[i].BP_PREF_FLAG+"'";

					var path = "/CaDefFlagSet(CA_BP_NUM='" + ca_data[i].CA_BP_NUM +
						"',DEF_PREF_FLAG='" + ca_data[i].DEF_PREF_FLAG + "',BP_PREF_FLAG='" + ca_data[i].BP_PREF_FLAG + "')";
					// var data = [];
					// data.push(obj);
					oModel.update(path, obj, {
						async: false,
						success: function (oData, oResponse) {
							that.data_saved = "X";
							/*	var message = "Data saved successfully";
								MessageToast.show(message);*/
						},
						error: function (oError) {
							// var err = JSON.parse(oError.responseText);
							var msg;
							// if (err.error.message.value === "") {
							// 	msg = "Failure - OData Service could not be called. Please check the Network Tab at Debug.";
							// } else {
							// 	msg = err.error.message.value;
							// }
							// jQuery.sap.require("sap.m.MessageBox");

							// sap.m.MessageBox.show(msg, {
							// 	icon: sap.m.MessageBox.Icon.ERROR,
							// 	title: "Error Message",
							// 	actions: [sap.m.MessageBox.Action.OK]
							// });
						}
					});
					if (ca_data[i].BP_PREF_FLAG) {
						var oManifestEntry2 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_GET_ADDRESS_SRV.uri;

						var oModel2 = new sap.ui.model.odata.ODataModel(oManifestEntry2, {
							json: true,
							loadMetadataAsync: true
						});
						var sPath = "/BpPreferenceOnSet?$filter=BpCa eq '" + this.getView().byId("BP").getValue() + "' and MasterAddrNum eq '" + this.adrNum +
							"' and Ca eq '" + ca_data[i].CA_BP_NUM + "'";
						oModel2.read(sPath, {
							async: false,
							success: function (data) {},
							error: function (error) {
								var sMessage = JSON.parse(error.response.body);
								sap.m.MessageBox.show(sMessage.error.message.value, {
									icon: "ERROR",
									title: "Message",
									styleClass: "Message",
									actions: [sap.m.MessageBox.Action.OK],
									onClose: function (oAction) {}
								});
							}

						});
					}
				}
			},

			SaveAlertsNew: function (evt) {
				var sequence;
				var msg = " ";
				var alerts = [];
				var obj = {};
				var email, mobile, postal, ppost_flag, pemail_flag, psms_flag;
				var sequence;

				// var oManifestEntry1 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_PREF_ALERTTRANSDATA_SRV.uri;
				var oManifestEntry1 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_ALERTS_SRV.uri;
				var oModel = new sap.ui.model.odata.ODataModel(oManifestEntry1, {
					json: true,
					loadMetadataAsync: true
				});
				var that = this;
				var bp = this.getView().byId("BP").getValue();

				// var oTab_adrnr = this.getView().byId("T1");
				var oTab_adrnr = this.getView().byId("ALT1");
				var items = oTab_adrnr.getItems();
				var path_alerts = "/AlertsSet(CaBpNum='" + bp + "')";
				for (var i = 0; i < items.length; i++) {
					var data = items[i].getBindingContext('ALERTS_NEW').oModel.oData[i];
					var obj = {};
					obj.ImInput = data.ImInput;
					obj.CaBpNum = data.CaBpNum;
					obj.AlertId = data.AlertId;
					obj.AlertText = data.AlertText;
					obj.AlertDescr = data.AlertDescr;

					if (data.AlertFlag === true) {
						obj.AlertFlag = "X";
					} else {
						obj.AlertFlag = "";
					}

					oModel.update(path_alerts, obj, {
						async: false,
						success: function (oData, oResponse) {
							that.data_saved = "X";
							/*var message = "Data saved successfully";
							MessageToast.show(message);*/
						},
						error: function (oError) {
							// var err = JSON.parse(oError.responseText);
							var msg;
							// if (err.error.message.value === "") {
							// 	msg = "Failure - OData Service could not be called. Please check the Network Tab at Debug.";
							// } else {
							// 	msg = err.error.message.value;
							// }
							// jQuery.sap.require("sap.m.MessageBox");

							// sap.m.MessageBox.show(msg, {
							// 	icon: sap.m.MessageBox.Icon.ERROR,
							// 	title: "Error Message",
							// 	actions: [sap.m.MessageBox.Action.OK]
							// });
						}
					});
				}
			},

			resetPref: function (oEvent) {
				var defaultPrefEntitySet = "/DefaultPreferenceSaveSet";
				var defaultOn = "",
					defaultBpOn = "";
				if (this.getView().byId("BP").getValue().trim().length === 12) {
					if (this.getView().byId("Toggle1").getState()) {
						defaultOn = "X";
					}
					if (this.getView().byId("Toggle2").getState()) {
						defaultBpOn = "X";
					}

				} else {
					if (this.getView().byId("Toggle1").getState())
						defaultOn = "X";
				}

				var updateData = {
					BpCa: this.getView().byId("BP").getValue(),
					DefaultOn: defaultOn,
					DefaultBpOn: defaultBpOn,
					MasterAddrNum: this.adrNum
				};
				var oManifestEntry2 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_GET_ADDRESS_SRV.uri;
				var oModel2 = new sap.ui.model.odata.ODataModel(oManifestEntry2, {
					async: true
				});
				oModel2.create(defaultPrefEntitySet, updateData, {
					success: jQuery.proxy(this.resetDefaultPrefs, this),
					error: jQuery.proxy(this.oError, this)
				});
			},

			resetDefaultPrefs: function () {
				sap.m.MessageToast.show("Data saved successfully!");
			},

			GetPreference: function (path_pref) {
				
				var oManifestEntrydefault = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_GET_PREFERENCES_SRV.uri;
				var oModelDefault2 = new sap.ui.model.odata.ODataModel(oManifestEntrydefault, {
					json: true,
					loadMetadataAsync: true
				});

				oModelDefault2.read("/DefaultPrefSet", {
					async: false,
					success: function (data) {
						def_pref = data.results;
					},

					error: function (error) {
						// var sMessage = JSON.parse(error.response.body);
						var sMessage;
						// sap.m.MessageBox.show(sMessage.error.message.value, {
						// 	icon: "ERROR",
						// 	title: "Message",
						// 	styleClass: "Message",
						// 	actions: [sap.m.MessageBox.Action.OK],
						// 	onClose: function(oAction) {}
						// });
					}
				});

				var oManifestEntry1 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_PREF_USERTRANSDATA_SRV.uri;
				var oModel1 = new sap.ui.model.odata.ODataModel(oManifestEntry1, {
					json: true,
					loadMetadataAsync: true
				});

				// var post_adr = this.getView().byId("T1");
				var ca_data = this.getView().getModel("POSTADR").getData();

				var pref = [];
				var inst_pref = [];
				var bp_pref = [];
				var that = this;
				var path = path_pref;
				var use_default = 0;
				email_count = 0;

				if (error_flg === "X") {
					error_flg = "";

					var oModel_Temp = new sap.ui.model.json.JSONModel();
					// Preference
					var oTable = that.getView().byId("PL1");
					oTable.setModel(oModel_Temp, "PREFERENCE");

					var oToggle = that.getView().byId("Toggle1");
					oToggle.setState(false);
				} else {
					// Get CA/BP preference
					oModel1.read(path, {
						async: false,
						success: function (data) {
							inst_pref = data.results;
						},
						error: function (error) {
							var sMessage = JSON.parse(error.response.body);
							sap.m.MessageBox.show(sMessage.error.message.value, {
								icon: "ERROR",
								title: "Message",
								styleClass: "Message",
								actions: [sap.m.MessageBox.Action.OK],
								onClose: function (oAction) {}
							});
						}
					});
					// Get BP preferences incase CA preference is not present --- ONLY FOR CA
					// if (ca_data[0].ExBpOrCaFlag === "CA" && inst_pref === "undefined") {
					// 									that.getView().byId("Toggle2").setState(true);
					// 			that.getView().byId("BP_Label").setVisible(true);
					// 			that.BPToggle();
					// var oManifestEntry2 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_GET_PREFERENCES_SRV.uri;
					// var oModel2 = new sap.ui.model.odata.ODataModel(oManifestEntry2, {
					// 	json: true,
					// 	loadMetadataAsync: true
					// });

					// var ca = this.getView().byId("BP").getValue();
					// var ca_path = "/CustPrefSet?$filter=ImInput eq '" + ca + "')";
					// oModel2.read(ca_path, {
					// 	async: true,
					// 	success: function(data) {
					// 		inst_pref = data.results;
					// 	}
					// });
					// }
					if (ca_data[0].ExBpOrCaFlag === "CA" && inst_pref.length < 1) { //Set Default preferences 
						that.getView().byId("Toggle2").setState(true);
						that.getView().byId("BP_Label").setVisible(true);
						that.BPToggle();
					}
					if (ca_data[0].ExBpOrCaFlag === "BP" && inst_pref.length < 1) { //Set Default preferences 
						that.getView().byId("Toggle1").setState(true);
						// that.getView().byId("defpref").setVisible(true);
						that.DefaultToggle();
					}
					if (inst_pref.length > 1) {
						for (var i = 0; i < inst_pref.length; i++) {
							var obj = {};
							obj.CA_BP_NUM = inst_pref[i].CA_BP_NUM;
							obj.ADDRESS_NUM = inst_pref[i].ADDRESS_NUM;
							obj.PREF_ID = inst_pref[i].PREF_ID;
							obj.CONSNUMBER = inst_pref[i].CONSNUMBER;
							obj.PREF_TEXT = inst_pref[i].PREF_TEXT;
							obj.EMAIL_FLAG = inst_pref[i].EMAIL_FLAG;
							obj.MOBILE_FLAG = inst_pref[i].MOBILE_FLAG;
							obj.POSTAL_FLAG = inst_pref[i].POSTAL_FLAG;
							obj.pemail_flag = inst_pref[i].pemail_flag;
							obj.psms_flag = inst_pref[i].psms_flag;
							obj.ppost_flag = inst_pref[i].ppost_flag;
							obj.def_email = "";
							obj.def_sms = "";
							obj.def_post = "";
							obj.text = "";
							obj.EMAIL_ICON_FLG = inst_pref[i].EMAIL_ICON_FLG;
							obj.MOBILE_ICON_FLG = inst_pref[i].MOBILE_ICON_FLG;
							obj.POSTAL_ICON_FLG = inst_pref[i].POSTAL_ICON_FLG;

							if (inst_pref[i].EMAIL_FLAG === "X" || inst_pref[i].EMAIL_FLAG === true) {
								email_count = email_count + 1;
							}
							if (inst_pref[i].pemail_flag === "X" || inst_pref[i].pemail_flag === true) {
								obj.pemail_flag = true;
							} else {
								obj.pemail_flag = false;
							}
							if (inst_pref[i].psms_flag === "X" || inst_pref[i].psms_flag === true) {
								obj.psms_flag = true;
							} else {
								obj.psms_flag = false;
							}
							if (inst_pref[i].ppost_flag === "X" || inst_pref[i].ppost_flag === true) {
								obj.ppost_flag = true;
							} else {
								obj.ppost_flag = false;
							}

							if (obj.EMAIL_FLAG === "X" || obj.EMAIL_FLAG === true) {
								obj.EMAIL_FLAG = true;
							} else {
								obj.EMAIL_FLAG = false;
							}
							if (obj.MOBILE_FLAG === "X" || obj.MOBILE_FLAG === true) {
								obj.MOBILE_FLAG = true;
							} else {
								obj.MOBILE_FLAG = false;
							}
							if (obj.POSTAL_FLAG === "X" || obj.POSTAL_FLAG === true) {
								obj.POSTAL_FLAG = true;
							} else {
								obj.POSTAL_FLAG = false;
							}

							// if (inst_pref[i].DEF_FLG === "X") {
							// 	// Do Nothing
							// } else {
							// 	use_default = use_default + 1;
							// }

							if (inst_pref[i].pemail_flag === "X" || inst_pref[i].pemail_flag === true) {
								obj.def_email = true;
							} else {
								obj.def_email = false;
							}
							if (inst_pref[i].psms_flag === "X" || inst_pref[i].psms_flag === true) {
								obj.def_sms = true;
							} else {
								obj.def_sms = false;
							}
							if (inst_pref[i].ppost_flag === "X" || inst_pref[i].ppost_flag === true) {
								obj.def_post = true;
							} else {
								obj.def_post = false;
							}

							if (that.getView().byId("Email").getValue() === "") {
								obj.def_email = false;
							}
							if (that.getView().byId("SMS").getValue() === "") {
								obj.def_sms = false;
							}

							pref.push(obj);
						}
						Fpref = pref;
						var oModel_Temp = new sap.ui.model.json.JSONModel();
						oModel_Temp.setData(pref);

						// Preference
						var oTable = that.getView().byId("PL1");
						oTable.setModel(oModel_Temp, "PREFERENCE");
					}

					// else {
					// 	for (var i = 0; i < pref.length; i++) {
					// 		if (use_default < 1) { //Set Default preferences 
					// 			pref[i].def_email = false;
					// 			pref[i].def_sms = false;
					// 			pref[i].def_post = false;

					// 			for (var j = 0; j < def_pref.length; j++) {
					// 				if (pref[i].PREF_ID === def_pref[j].PrefId && def_pref[j].DefaultComm === "E") {
					// 					pref[i].EMAIL_FLAG = "X";
					// 				}
					// 				if (pref[i].PREF_ID === def_pref[j].PrefId && def_pref[j].DefaultComm === "S") {
					// 					pref[i].MOBILE_FLAG = "X";
					// 				}
					// 				if (pref[i].PREF_ID === def_pref[j].PrefId && def_pref[j].DefaultComm === "P") {
					// 					pref[i].POSTAL_FLAG = "X";
					// 				}
					// 			}
					// 			j = 0;
					// 		}
					// 	}

					// 	var oModel_Temp = new sap.ui.model.json.JSONModel();
					// 	oModel_Temp.setData(pref);
					// 	Fpref = pref;

					// 	// Preference
					// 	var oTable = that.getView().byId("PL1");
					// 	oTable.setModel(oModel_Temp, "PREFERENCE");

					// 	if (use_default < 1) {
					// 		var oToggle = that.getView().byId("Toggle1");
					// 		oToggle.setState(true);
					// 		// sap.m.MessageToast.show("Default user preferences - ON");
					// 	} else {
					// 		var oToggle = that.getView().byId("Toggle1");
					// 		oToggle.setState(false);
					// 	}
					// }

					var oTab_adrnr = that.getView().byId("T1");
					var adr_items = oTab_adrnr.getItems();
					for (var j = 0; j < adr_items.length; j++) { // Comm. Data
						// var data2 = adr_items[j].getBindingContext('POSTADR').oModel.oData[j];
						var data2 = this.getView().getModel('POSTADR').getData()[j];
						if (data2.text === "Email" && data2.value === "") {
							no_email = "X";
						}
					}

					if (no_email === "X" && email_count > 0) { //"Email" is default preference, but if no email has been maintained
						sap.m.MessageBox.show("No Email maintained w.r.t preference chosen", {
							icon: sap.m.MessageBox.Icon.WARNING,
							title: "WARNING Message",
							actions: [sap.m.MessageBox.Action.OK]
						});
					}
				}
			},
			GetAlertsNew: function (path_pref) {
				// var oManifestEntry1 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_PREF_ALERTTRANSDATA_SRV.uri;
				var oManifestEntry1 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_ALERTS_SRV.uri;
				var oModel1 = new sap.ui.model.odata.ODataModel(oManifestEntry1, {
					json: true,
					loadMetadataAsync: true
				});
				var pref = [];
				var tab1 = [];
				var tab2 = [];
				var that = this;
				var path = path_pref;
				var use_default = 0;

				// Get NEW Alerts
				oModel1.read(path, {
					async: true,
					success: function (data) {
						for (var i = 0; i < data.results.length; i++) {
							var obj = {};
							obj.ImInput = data.results[i].ImInput;
							obj.CaBpNum = data.results[i].CaBpNum;
							obj.AlertId = data.results[i].AlertId;
							obj.HB_EDIT = false;
							obj.PR_EDIT = false;

							if (data.results[i].AlertFlag === "X") {
								obj.AlertFlag = true;
							} else {
								obj.AlertFlag = false;
							}

							obj.AlertText = data.results[i].AlertText;
							obj.AlertDescr = data.results[i].AlertDescr;
							obj.show = true;
							if (data.results[i].AlertId === "PR") {
								obj.PR = true;
								obj.PR_TXT1 = data.results[i].AlertLongText1;
								obj.PR_TXT2 = data.results[i].AlertLongText2;
								obj.DAYS = that.getView().byId("Days").getValue();
							} else {
								obj.PR = false;
							}

							if (data.results[i].AlertId === "HB") {
								obj.HB = true;
								obj.HB_TXT1 = data.results[i].AlertLongText1;
								obj.NOTIFY = that.getView().byId("notify").getValue();
							} else {
								obj.HB = false;
							}

							if (data.results[i].AlertId === "SU") {
								obj.SU = true;
								obj.show = false;
								obj.SU_TXT1 = data.results[i].AlertLongText1;
								obj.FREQ = that.getView().byId("combo").getValue();
							} else {
								obj.SU = false;
							}

							if (data.results[i].AlertId === "HB" && data.results[i].AlertFlag === "X") {
								obj.HB_EDIT = true;
								obj.HB = true;
							}
							if (data.results[i].AlertId === "HB" && data.results[i].AlertFlag === "") {
								obj.HB_EDIT = false;
								obj.HB = false;
							}

							if (data.results[i].AlertId === "PR" && data.results[i].AlertFlag === "X") {
								obj.PR_EDIT = true;
								obj.PR = true;
							}
							if (data.results[i].AlertId === "PR" && data.results[i].AlertFlag === "") {
								obj.PR_EDIT = false;
								obj.PR = false;
							}

							pref.push(obj);
						}

						// for (var i = 0; i < pref.length; i++) {
						// 	if (pref[i].AlertId === "AA" && pref[i].AlertFlag === true) {
						// 		that.getView().byId("Days").setEditable(true);
						// 		that.getView().byId("Days").addStyleClass("Inputpad");
						// 		that.getView().byId("notify").setEditable(true);
						// 		// that.getView().byId("combo").setEditable(true);
						// 		// that.getView().byId("combo").addStyleClass("Inputpad");
						// 	}

						// 	if (pref[i].AlertId === "AA" && pref[i].AlertFlag === false) {
						// 		that.getView().byId("Days").setEditable(false);
						// 		that.getView().byId("Days").addStyleClass("ReadOnly");
						// 		that.getView().byId("notify").setEditable(false);
						// 		// that.getView().byId("combo").setEditable(false);
						// 		// that.getView().byId("combo").addStyleClass("ReadOnly");
						// 	}
						// }

						FalertsNew = pref;
						var oModel_Temp = new sap.ui.model.json.JSONModel();
						oModel_Temp.setData(pref);

						// Preference
						var oTable = that.getView().byId("ALT1");
						oTable.setModel(oModel_Temp, "ALERTS_NEW");
					},

					error: function (error) {
						that.getView().byId("SC1").setVisible(false);
						// var sMessage = JSON.parse(error.response.body);
						// sap.m.MessageBox.show(sMessage.error.message.value, {
						// 	icon: "ERROR",
						// 	title: "Message",
						// 	styleClass: "Message",
						// 	actions: [sap.m.MessageBox.Action.OK],
						// 	onClose: function(oAction) {}
						// });
					}
				});
				// }
			},

			BackToBp: function (evt) {
				this.getView().byId("Back").setVisible(false);
				this.getView().byId("BP").setValue(org_bp);
				this.BpClick();
			},

			open_ca: function (evt) {
				// var index = evt.getSource().getParent().getBindingContextPath();
				// var data = evt.getSource().getParent().getCells()[0].getModel('CA_LIST').getData();
				// var ca = data[index.slice(1, 2)].CA_BP_NUM;
				var ca = evt.getSource().getProperty('text');

				org_bp = this.getView().byId("BP").getValue();
				this.getView().byId("Back").setVisible(true);
				this.getView().byId("BP").setValue(ca);
				this.BpClick();
			},

			SetPrHb: function (evt) {
				var data = evt.getSource().getParent().getCells()[0].getContent();
				var oModel_Temp = new sap.ui.model.json.JSONModel();
				var oTable = this.getView().byId("ALT1");
				for (var i = 0; i < data.length; i++) {
					var index = data[i].getBindingContext('ALERTS_NEW').getPath();
					var y = evt.getSource().getParent().getTable().getModel("ALERTS_NEW").getProperty(index);
					var data1 = evt.getSource().getParent().getTable().getModel("ALERTS_NEW").getData();
					if (y.AlertId === "PR" && y.AlertFlag === false) {
						data1[index.slice(1, 2)].PR_EDIT = false;
						data1[index.slice(1, 2)].PR = false;
					}
					if (y.AlertId === "PR" && y.AlertFlag === true) {
						data1[index.slice(1, 2)].PR_EDIT = true;
						data1[index.slice(1, 2)].PR = true;
					}
					if (y.AlertId === "HB" && y.AlertFlag === false) {
						data1[index.slice(1, 2)].HB_EDIT = false;
						data1[index.slice(1, 2)].HB = false;
					}
					if (y.AlertId === "HB" && y.AlertFlag === true) {
						data1[index.slice(1, 2)].HB_EDIT = true;
						data1[index.slice(1, 2)].HB = true;
					}

					oModel_Temp.setData(data1);
					oTable.setModel(oModel_Temp, "ALERTS_NEW");
				}
			},

			AlertsSave: function (evt) {
				var bp = this.getView().byId("BP").getValue();
				var that = this;
				var obj = {};
				var rg1 = that.getView().byId("RG1");
				// var rg2 = that.getView().byId("RG2"); VM Needed
				var tm1 = that.getView().byId("TM1");
				var tm2 = that.getView().byId("TM2");
				// var vm1 = that.getView().byId("VM1"); VM Needed
				// var vm2 = that.getView().byId("VM2"); VM Needed

				obj.VKONT = bp;
				var oTab_adrnr = this.getView().byId("ALT1");
				var items = oTab_adrnr.getItems();
				for (var i = 0; i < items.length; i++) {
					var data = items[i].getBindingContext('ALERTS_NEW').oModel.oData[i];
					if (data.AlertId === "PR") {
						obj.NUM_OF_DAYS = data.DAYS;
					}
					if (data.AlertId === "HB") {
						obj.NOTIF_AMOUNT = data.NOTIFY;
					}
					if (data.AlertId === "SU") {
						obj.SPL_UPDT_FREQ = data.FREQ;
					}
				}
				if (rg1.getSelectedIndex() === 0) {
					obj.ANYTMTXT_FLAG = 'X';
					obj.TIMETXT_FROM = '00:00:00';
					obj.TIMETXT_TO = '00:00:00';
				} else {
					obj.BTWTXT_FLAG = 'X';
					obj.TIMETXT_FROM = tm1.getValue(); //.slice(0, 8);
					obj.TIMETXT_TO = tm2.getValue(); //.slice(0, 8);
				}

				// if (rg2.getSelectedIndex() === 0) {   VM Needed
				// 	obj.ANYTMVOICE_FLAG = 'X';
				// 	obj.TIMEVOICE_FROM = '00:00:00';
				// 	obj.TIMEVOICE_TO = '00:00:00';
				// } else {
				// 	obj.BTWVOICE_FLAG = 'X';
				// 	obj.TIMEVOICE_FROM = vm1.getValue().slice(0, 8);
				// 	obj.TIMEVOICE_TO = vm2.getValue().slice(0, 8);
				// }

				// Alerts Odata
				var oManifestEntry = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_PREF_ALERTSTOBP_SRV.uri;
				var oModel = new sap.ui.model.odata.ODataModel(oManifestEntry, {
					json: true,
					loadMetadataAsync: true
				});
				var path_alerts = "/AlertUserDataSet(VKONT='" + bp + "')";

				oModel.update(path_alerts, obj, {
					async: false,
					success: function (oData, oResponse) {
						that.data_saved = "X";
						/*var message = "Data saved successfully";
						MessageToast.show(message);*/
					},
					error: function (oError) {
						// var err = JSON.parse(oError.responseText);
						// var msg;
						// if (err.error.message.value === "") {
						// 	msg = "Failure - OData Service could not be called. Please check the Network Tab at Debug.";
						// } else {
						// 	msg = err.error.message.value;
						// }
						// jQuery.sap.require("sap.m.MessageBox");

						// sap.m.MessageBox.show(msg, {
						// 	icon: sap.m.MessageBox.Icon.ERROR,
						// 	title: "Error Message",
						// 	actions: [sap.m.MessageBox.Action.OK]
						// });
					}
				});
			},
			handleSearch: function () {
				var bp = this.getView().byId("BP").getValue();
				var that = this;
				if (bp === "") {
					sap.m.MessageToast.show("Please enter Business Partner/Account Number");
				} else if (this.prev_bp !== undefined && this.prev_bp !== bp && this.data_saved !== "X") {
					MessageBox.warning(
						// "Data is not saved. Are you sure you want to exit?", {
						"Unsaved data may be lost. Do you still want to proceed?", {
							actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],

							onClose: function (actions) {
								if (actions === "YES") {
									email_count = 0;
									no_email = "";
									that.BpClick();
									that.data_saved = "";
								} else if (actions === "NO") {
									that.getView().byId("BP").setValue(that.prev_bp);
									return;
								}
							}
						}
					);
				} else {
					this.BpClick();
					that.data_saved = "";
				}
			},

			BpClick: function () {

				this.getView().byId("Toggle2").setState(false);
				this.getView().byId("Toggle1").setState(false);
				this.getView().byId("defPref").setText("Turn Default Preferences ON");
				this.getView().byId("BP_Label").setText("Turn BP Preferences ON");
				this.getView().byId("obj_noBpPref").setVisible(false);

				var bp = this.getView().byId("BP").getValue();
				this.prev_bp = bp;
				var path_pref;
				var that = this;
				search_ca = "";

				// Expand all panels
				if (bp === "") {
					sap.m.MessageToast.show("Please enter Business Partner/Account Number");
				} else {
					sap.m.MessageToast.show("Business Partner/Account Number search successful");
					//	this.getView().byId("CD").setExpanded(true);
					this.getView().byId("PR").setExpanded(true);
					this.getView().byId("AL").setExpanded(true);
					// this.getView().byId("CD").setVisible(true);
					this.getView().byId("PR").setVisible(true);
					this.getView().byId("AL").setVisible(true);
					this.getView().byId("ALL").setVisible(true);
					this.getView().byId("contData").setVisible(true);

					if (this.getView().byId("BP").getValue().trim().length === 10) {
						this.getView().getModel("oBpCaModel").setProperty("/sBpCa", "BP");
					} else if (this.getView().byId("BP").getValue().trim().length === 12) {
						this.getView().getModel("oBpCaModel").setProperty("/sBpCa", "CA");
					} else {
						this.getView().getModel("oBpCaModel").setProperty("/sBpCa", "");
					}

					// Alerts
					var oManifestEntry3 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_PREF_ALERTSTOBP_SRV.uri;
					var oModel3 = new sap.ui.model.odata.ODataModel(oManifestEntry3, {
						json: true,
						loadMetadataAsync: true
					});
					var path_alerts = "/AlertUserDataSet(VKONT='" + bp + "')";

					oModel3.read(path_alerts, {
						async: false,
						success: function (data) {

							that.getView().byId("Days").setValue(data.NUM_OF_DAYS);
							that.getView().byId("notify").setValue(data.NOTIF_AMOUNT);
							that.getView().byId("combo").setValue(data.SPL_UPDT_FREQ);

							var rg1 = that.getView().byId("RG1");
							// var rg2 = that.getView().byId("RG2"); VM Needed
							var tm1 = that.getView().byId("TM1");
							var tm2 = that.getView().byId("TM2");
							// var vm1 = that.getView().byId("VM1"); VM Needed
							// var vm2 = that.getView().byId("VM2"); VM Needed
							var box1 = that.getView().byId("TMB");
							// var box2 = that.getView().byId("VMB"); VM Needed
							// var tm_toggle = that.getView().byId("TM_TOGGLE");
							// var vm_toggle = that.getView().byId("VM_TOGGLE"); VM Needed

							// tm_toggle.setState(true);
							// vm_toggle.setState(true); VM Needed

							if (data.TIMETXT_FROM === "000000") {
								tm1.setValue(new Date());
							} else {
								tm1.setValue(data.TIMETXT_FROM);
							}

							if (data.TIMETXT_TO === "000000") {
								tm2.setValue(new Date());
							} else {
								tm2.setValue(data.TIMETXT_TO);
							}

							// if (data.TIMEVOICE_FROM === "000000") { VM Needed
							// 	vm1.setValue(new Date());
							// } else {
							// 	vm1.setValue(data.TIMEVOICE_FROM);
							// }

							// if (data.TIMEVOICE_TO === "000000") {
							// 	vm2.setValue(new Date());
							// } else {
							// 	vm2.setValue(data.TIMEVOICE_TO);
							// }

							if (data.ANYTMTXT_FLAG === 'X') {
								rg1.setSelectedIndex(0);
								box1.setVisible(false);
							} else {
								rg1.setSelectedIndex(1);
								box1.setVisible(true);
							}

							// if (data.ANYTMVOICE_FLAG === 'X') {  VM Needed
							// 	rg2.setSelectedIndex(0);
							// 	box2.setVisible(false);
							// } else {
							// 	rg2.setSelectedIndex(1);
							// 	box2.setVisible(true);
							// }
							that.TMToggle();
							// that.VMToggle(); VM Needed
						},

						error: function (error) {
							var rg1 = that.getView().byId("RG1");
							// var rg2 = that.getView().byId("RG2"); VM Needed
							var tm1 = that.getView().byId("TM1");
							var tm2 = that.getView().byId("TM2");
							// var vm1 = that.getView().byId("VM1"); VM Needed
							// var vm2 = that.getView().byId("VM2"); VM Needed
							var box1 = that.getView().byId("TMB");
							// var box2 = that.getView().byId("VMB"); VM Needed
							// var tm_toggle = that.getView().byId("TM_TOGGLE");
							// var vm_toggle = that.getView().byId("VM_TOGGLE"); VM Needed

							rg1.setSelectedIndex(0);
							box1.setVisible(false);
							// rg2.setSelectedIndex(0);  VM Needed
							// box2.setVisible(false);	VM Needed
							tm1.setValue(new Date());
							tm2.setValue(new Date());
							// vm1.setValue(new Date());VM Needed
							// vm2.setValue(new Date());VM Needed
							// tm_toggle.setState(false);
							// vm_toggle.setState(false);VM Needed

							// var sMessage = JSON.parse(error.response.body);
							// sap.m.MessageBox.show(sMessage.error.message.value, {
							// 	icon: "ERROR",
							// 	title: "Message",
							// 	styleClass: "Message",
							// 	actions: [sap.m.MessageBox.Action.OK],
							// 	onClose: function(oAction) {}
							// });
						}
					});

					var oManifestEntry2 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_GET_ADDRESS_SRV.uri;
					var oModel2 = new sap.ui.model.odata.ODataModel(oManifestEntry2, {
						json: true,
						loadMetadataAsync: true
					});
					var adrnr = [];
					// Email
					var path_email = "/MailAddressSet?$filter=ImInput eq '" + bp + "'";

					oModel2.read(path_email, {
						async: false,
						success: function (data) {
							// Email Address
							var oEmail = that.getView().byId("Email");
							if (data.results.length > 0) {
								oEmail.setValue(data.results[0].EmailAddress);
								seq_no = data.results[0].SeqNumber;
							} else {
								oEmail.setValue("");
								seq_no = undefined;
							}
						},

						error: function (error) {
							// var sMessage = JSON.parse(error.response.body);
							// var sMessage = error.response.statusText;
							// sap.m.MessageBox.show(sMessage.error.message.value, {
							// 	icon: "ERROR",
							// 	title: "Message",
							// 	styleClass: "Message",
							// 	actions: [sap.m.MessageBox.Action.OK],
							// 	onClose: function(oAction) {}
							// });
						}
					});

					// Fax
					var path_fax = "/FaxNumbersSet?$filter=ImInput eq '" + bp + "'";

					oModel2.read(path_fax, {
						async: false,
						success: function (data) {
							// Fax Address
							var oFax = that.getView().byId("fax");
							if (data.results.length > 0) {
								oFax.setValue(data.results[0].FaxNumber);
								seq_no = data.results[0].SeqNumber;
							} else {
								oFax.setValue();
								seq_no = undefined;
							}
						},

						error: function (error) {
							// var sMessage = JSON.parse(error.response.body);
							// var sMessage = error.response.statusText;
							// sap.m.MessageBox.show(sMessage.error.message.value, {
							// 	icon: "ERROR",
							// 	title: "Message",
							// 	styleClass: "Message",
							// 	actions: [sap.m.MessageBox.Action.OK],
							// 	onClose: function(oAction) {}
							// });
						}
					});

					// SMS(Mobile) & Telephone
					var path_sms = "/ContactNumbersSet?$filter=ImInput eq '" + bp + "'";

					oModel2.read(path_sms, {
						async: false,
						success: function (data) {
							// SMS(Mobile)
							var oSms = that.getView().byId("SMS");
							// Telephone
							var oTele = that.getView().byId("telephone");
							oSms.setValue();
							oTele.setValue();
							if (data.results.length > 0) {
								for (var i = 0; i < data.results.length; i++) {
									if (data.results[i].MobileFlag === "X") {
										oSms.setValue(data.results[i].ContactNumber);
									} else {
										oTele.setValue(data.results[i].ContactNumber);
									}
									seq_no = data.results[i].SeqNumber;
								}
							} else {
								oSms.setValue();
								oTele.setValue();
								seq_no = undefined;
							}
						},

						error: function (error) {
							// var sMessage = JSON.parse(error.response.body);
							// var sMessage = JSON.parse(error.response.statusText);
							// sap.m.MessageBox.show(sMessage.error.message.value, {
							// 	icon: "ERROR",
							// 	title: "Message",
							// 	styleClass: "Message",
							// 	actions: [sap.m.MessageBox.Action.OK],
							// 	onClose: function(oAction) {}
							// });
						}
					});

					// Post
					var path_post = "/PostAddressSet?$filter=ImInput eq '" + bp + "'";
					var address = [];
					oModel2.read(path_post, {
						async: false,
						success: function (data) {
							var oModel_Temp = new sap.ui.model.json.JSONModel();

							for (var i = 0; i < data.results.length; i++) {
								for (var j = 0; j < 5; j++) {
									var obj = {};
									obj.AddressNumber = data.results[i].AddressNumber;
									obj.BpNum = data.results[i].BpNum;
									obj.ExBpOrCa = data.results[i].ExBpOrCa;
									obj.ExBpOrCaExist = data.results[i].ExBpOrCaExist;
									obj.ExBpOrCaFlag = data.results[i].ExBpOrCaFlag;
									obj.ImInput = data.results[i].ImInput;
									obj.enabled = false;

									if (j === 0) {
										obj.src = "sap-icon://building"; //Address
										obj.text = "Mail";
										obj.value = data.results[i].PostalAddress;
										var name = obj.value.split(',')[0];
										that.getView().byId("name").setText(name);
										address.push(obj);
									}
									if (j === 1) {
										obj.src = "sap-icon://phone"; //Telephone
										obj.text = "Telephone";
										obj.value = that.getView().byId("telephone").getValue();
										address.push(obj);
									}
									if (j === 2) {
										obj.src = "sap-icon://iphone"; //Mobile or SMS
										obj.text = "Mobile";
										obj.value = that.getView().byId("SMS").getValue();
										address.push(obj);
									}
									if (j === 3) {
										obj.src = "sap-icon://email"; //Email
										obj.text = "Email";
										obj.value = that.getView().byId("Email").getValue();
										address.push(obj);
									}
									if (j === 4) {
										obj.src = "sap-icon://fax-machine"; //Fax
										obj.text = "Fax";
										obj.value = that.getView().byId("fax").getValue();
										address.push(obj);
									}
								}
							}

							oModel_Temp.setData(address);
							that.tempAdrs = JSON.stringify(address);
							// Postal Address
							var oTable = that.getView().byId("T1");
							// oTable.setcolumnHeaderHeight("1");
							// oTable.setModel(oModel_Temp, "POSTADR");
							that.getView().setModel(oModel_Temp, "POSTADR");

							var oToggle = that.getView().byId("Toggle2");
							var BP_Label = that.getView().byId("BP_Label");

							if (data.results.length === 0) {
								oToggle.setState(true);
								BP_Label.setVisible(true);
								that.BPToggle();

								var path_pref1 = "AlertsSet?$filter=ImInput eq '" + bp + "'";
								that.GetAlertsNew(path_pref1);
							} else {
								if (data.results[0].ExBpOrCaFlag === "CA") {
									search_ca = "X";
									oToggle.setVisible(true);
									BP_Label.setVisible(true);
									that.getView().byId("PL4").setExpanded(false);
									that.getView().byId("PL4").setVisible(false);
								} else {
									oToggle.setVisible(false);
									BP_Label.setVisible(false);
								}

								var sequence;

								if (seq_no === "") {
									sequence = "000";
								} else {
									sequence = seq_no;
								}

								if (typeof (seq_no) === "undefined") {
									sequence = "000";
								}

								if (data.results[0].ExBpOrCaFlag === "ER") {
									//	that.getView().byId("CD").setExpanded(false);
									that.getView().byId("PR").setExpanded(false);
									that.getView().byId("AL").setExpanded(false);
									that.getView().byId("ALL").setVisible(false);
									that.getView().byId("PL4").setExpanded(false);
									that.getView().byId("PL4").setVisible(false);
									// Preference
									bp = "dummy";
									error_flg = "X";

									path_pref = "/PrefUserDataSet?$filter=CA_BP_NUM eq '" + bp + "' and ADDRESS_NUM eq '" + data.results[0].AddressNumber +
										"' and CONSNUMBER eq '" + sequence + "'";
									// var path_pref1 = "/AlertUserDataSet?$filter=CA_BP_NUM eq '" + bp + "' and ADDRESS_NUM eq '" + data.results[0].AddressNumber +
									// 	"' and CONSNUMBER eq '" + sequence + "'";
									that.adrNum = data.results[0].AddressNumber;
									that.CONSNUMBER = sequence;
									var path_pref1 = "AlertsSet?$filter=ImInput eq '" + bp + "'";
									pref_path_org = path_pref;
									that.GetPreference(path_pref);
									that.GetAlertsNew(path_pref1);
									var msg = "Invalid Business Partner/Account Number";

									jQuery.sap.require("sap.m.MessageBox");

									sap.m.MessageBox.show(msg, {
										icon: sap.m.MessageBox.Icon.ERROR,
										title: "Error Message",
										actions: [sap.m.MessageBox.Action.OK]
									});
									that.getView().getModel("oBpCaModel").setProperty("/sBpCa", "");

								} else {
									//Address numbers
									for (var i = 0; i < data.results.length; i++) {
										var obj = {
											"ADDRESS_NUM": data.results[i].AddressNumber
										};
										adrnr.push(obj);
									}

									// Preferences
									path_pref = "/PrefUserDataSet?$filter=CA_BP_NUM eq '" + bp + "' and ADDRESS_NUM eq '" + data.results[0].AddressNumber +
										"' and CONSNUMBER eq '" + sequence + "'";

									// var path_pref1 = "/AlertUserDataSet?$filter=CA_BP_NUM eq '" + bp + "' and ADDRESS_NUM eq '" + data.results[0].AddressNumber +
									// 	"' and CONSNUMBER eq '" + sequence + "'";

									var path_pref1 = "AlertsSet?$filter=ImInput eq '" + bp + "'";

									that.adrNum = data.results[0].AddressNumber;
									that.CONSNUMBER = sequence;

									that.GetPreference(path_pref);
									that.GetAlertsNew(path_pref1);
								}
							}
						},

						error: function (error) {
							// var sMessage = JSON.parse(error.response.body);
							// sap.m.MessageBox.show(sMessage.error.message.value, {
							// 	icon: "ERROR",
							// 	title: "Message",
							// 	styleClass: "Message",
							// 	actions: [sap.m.MessageBox.Action.OK],
							// 	onClose: function(oAction) {}
							// });
						}
					});

					// List of CA's
					if (search_ca !== "X") {
						var oManifestEntry4 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_PREF_BPDTLS_SRV.uri;
						var oModel4 = new sap.ui.model.odata.ODataModel(oManifestEntry4, {
							json: true,
							loadMetadataAsync: true
						});
						var ca_list = [];
						var path_CA1 = "/BPUserDataSet?$filter=GPART eq '" + bp + "'";
						var oModel_Ca = new sap.ui.model.json.JSONModel();
						oModel4.read(path_CA1, {
							async: false,
							success: function (data) {
								for (var i = 0; i < data.results.length; i++) {
									var obj = {};
									obj.CA_BP_NUM = data.results[i].CA_BP_NUM;
									obj.GPART = data.results[i].GPART;
									obj.PREM_ADDRESS = data.results[i].PREM_ADDRESS;
									obj.CATYPE = data.results[i].CATYPE;
									if (data.results[i].DEF_PREF_FLAG === 'true') {
										obj.DEF_PREF_FLAG = true;
										obj.DEF_PREF_TXT = "Turn Default Preferences OFF";
									} else {
										obj.DEF_PREF_FLAG = false;
										obj.DEF_PREF_TXT = "Turn Default Preferences ON";
									}
									if (data.results[i].BP_PREF_FLAG === 'true') {
										obj.BP_PREF_FLAG = true;
										obj.BP_PREF_TXT = "Turn BP Preferences OFF";
									} else {
										obj.BP_PREF_FLAG = false;
										obj.BP_PREF_TXT = "Turn BP Preferences ON";
									}
									ca_list.push(obj);
								}
								oModel_Ca.setData(ca_list);
								that.getView().byId("CA").setModel(oModel_Ca, "CA_LIST");

								if (data.results.length > 0) {
									that.getView().byId("PL4").setExpanded(true);
									that.getView().byId("PL4").setVisible(true);
								}
							},
							error: function (error) {
								oModel_Ca.setData(undefined);
								that.getView().byId("CA").removeAllItems();
								that.getView().byId("PL4").setExpanded(false);
								that.getView().byId("PL4").setVisible(false);
							}
						});
					}
					var contPersonEntitySet = "/ContactPersonSet",
						aFilter = [],
						oCPManifestEntry = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_GET_ADDRESS_SRV.uri;
					var oCPModel = new sap.ui.model.odata.v2.ODataModel(oCPManifestEntry, {
						json: true,
						loadMetadataAsync: true
					});
					var sBpCa = new Filter("BpCa", "EQ", this.getView().byId("BP").getValue());
					aFilter.push(sBpCa);

					oCPModel.read(contPersonEntitySet, {
						async: true,
						filters: aFilter,
						success: jQuery.proxy(this.contactPersonData, this),
						error: jQuery.proxy(this.oError, this)
					});
				}

			},

			contactPersonData: function (oData, oResponse) {
				var oContPersonModel = new JSONModel();
				oContPersonModel.setData(oData.results);
				this.getView().byId("tbl_ContPrsnData").setModel(oContPersonModel, "oContactPersonData");
			},

			onEditCommDets: function (oEvent) {
				/*var selIndexPath = oEvent.getSource().getParent().getBindingContextPath();

				if (oEvent.getSource().getParent().getCells()[2].getValue() !== "") {
					oEvent.getSource().getParent().getCells()[2].setValueState("None");
				}

				var selRow = this.getView().byId("T1").getModel("POSTADR").getProperty(selIndexPath);
				if (selRow.enabled) {
					selRow.enabled = false;
					if (selRow.text === "Mobile") {
						selRow.value = JSON.parse(this.tempAdrs)[2].value;
					} else if (selRow.text === "Telephone") {
						selRow.value = JSON.parse(this.tempAdrs)[1].value;
					} else if (selRow.text === "Email") {
						selRow.value = JSON.parse(this.tempAdrs)[3].value;
					} else if (selRow.text === "Fax") {
						selRow.value = JSON.parse(this.tempAdrs)[4].value;
					}

				} else {
					if (selRow.text !== "Mail") {
						selRow.enabled = true;
					}
				}

				this.getView().byId("T1").getModel("POSTADR").refresh(true);*/

				var selCommMode = oEvent.getSource().getTooltip();
				var selRow;
				switch (selCommMode) {
				case "Mail":
					selRow = this.getView().getModel("POSTADR").getProperty("/0");
					break;
				case "Telephone":
					selRow = this.getView().getModel("POSTADR").getProperty("/1");
					break;
				case "Mobile":
					selRow = this.getView().getModel("POSTADR").getProperty("/2");
					break;
				case "Email":
					selRow = this.getView().getModel("POSTADR").getProperty("/3");
					break;
				case "Fax":
					selRow = this.getView().getModel("POSTADR").getProperty("/4");
					break;
				}

				if (selRow.enabled) {
					selRow.enabled = false;
					if (selRow.text === "Mobile") {
						selRow.value = JSON.parse(this.tempAdrs)[2].value;
					} else if (selRow.text === "Telephone") {
						selRow.value = JSON.parse(this.tempAdrs)[1].value;
					} else if (selRow.text === "Email") {
						selRow.value = JSON.parse(this.tempAdrs)[3].value;
					} else if (selRow.text === "Fax") {
						selRow.value = JSON.parse(this.tempAdrs)[4].value;
					}

				} else {
					if (selRow.text !== "Mail") {
						selRow.enabled = true;
					}
				}
				this.getView().getModel("POSTADR").refresh(true);
			},

			commDataSave: function (oEvent) {
				var commEntitySet = "/CommunicationDataSet";
				var updateData = {
					PartnerCa: this.getView().getModel("POSTADR").getData()[0].BpNum,
					CommunicationNav: [{
						Country: "",
						Telephone: this.getView().getModel("POSTADR").getData()[1].value,
						Mobile: this.getView().getModel("POSTADR").getData()[2].value,
						Email: this.getView().getModel("POSTADR").getData()[3].value,
						Fax: this.getView().getModel("POSTADR").getData()[4].value,
						PartnerCa: this.getView().getModel("POSTADR").getData()[0].BpNum

					}]
				};
				var oManifestEntry2 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_GET_ADDRESS_SRV.uri;
				var oModel2 = new sap.ui.model.odata.ODataModel(oManifestEntry2, {
					async: true
				});
				oModel2.create(commEntitySet, updateData, {
					success: jQuery.proxy(this.commResults, this),
					error: jQuery.proxy(this.oError, this)
				});
			},

			commResults: function (oData, oResponse) {
				var aCommData = this.getView().getModel("POSTADR").getData();
				if (aCommData.length > 0) {
					var that = this;
					var aTempCommData = JSON.parse(that.tempAdrs);
					aCommData.forEach(function (obj) {
						obj.enabled = false;
						if (obj.text === "Mail") {
							aTempCommData[0].value = obj.value;
						} else if (obj.text === "Telephone") {
							aTempCommData[1].value = obj.value;
						} else if (obj.text === "Mobile") {
							aTempCommData[2].value = obj.value;
						} else if (obj.text === "Email") {
							aTempCommData[3].value = obj.value;
						} else if (obj.text === "Fax") {
							aTempCommData[4].value = obj.value;
						}
					});
					that.tempAdrs = JSON.stringify(aTempCommData);
				}
				this.getView().getModel("POSTADR").refresh(true);
			},

			oError: function (oData, oResponse) {
				sap.m.MessageToast.show("Error");
			},

			onPrefPress: function (oEvent) {
				var selIndexPath = oEvent.getSource().getParent().getParent().getParent().getBindingContextPath();
				var selRow = this.getView().byId("PL1").getModel("PREFERENCE").getProperty(selIndexPath);
				this.selRow = selRow;
				var selPref = oEvent.getSource().getParent().data("prefType");
				this.selPref = selPref;
				var bOpenPopUp = false;
				var bCheckSel = false;
				if (selPref === "Email" && selRow.EMAIL_FLAG) {
					bOpenPopUp = true;
					if (selRow.EMAIL_ICON_FLG === "") {
						bCheckSel = true;
					}
				} else if (selPref === "Phone Number" && selRow.MOBILE_FLAG) {
					bOpenPopUp = true;
					if (selRow.MOBILE_ICON_FLG === "") {
						bCheckSel = true;
					}
				} else if (selPref === "Mail" && selRow.POSTAL_FLAG) {
					bOpenPopUp = true;
					if (selRow.POSTAL_ICON_FLG === "") {
						bCheckSel = true;
					}
				}
				if (bOpenPopUp) {
					if (!this._contPersonPopup) {
						this._contPersonPopup = sap.ui.xmlfragment(this.getView().getId(),
							"ZPREFCNTR_v2.Fragments.ContactPerson", this);

					}

					//Setting the Label of the 2nd column of the Table
					sap.ui.core.Fragment.byId(this.getView().getId(), "columnLabel").setText(selPref);

					var aDisplayCPs = [];
					var getCommPrefSet = "/ContactPreferenceInputSet",
						aFilter = [],
						oCPManifestEntry = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_GET_ADDRESS_SRV.uri;
					var oCPModel = new sap.ui.model.odata.v2.ODataModel(oCPManifestEntry, {
						json: true,
						loadMetadataAsync: true
					});
					var sBpCa = new Filter("BpCa", "EQ", this.getView().byId("BP").getValue());
					aFilter.push(sBpCa);
					var sPrefId = new Filter("PrefId", "EQ", selRow.PREF_ID);
					aFilter.push(sPrefId);
					var MasterAddrNum = new Filter("MasterAddrNum", "EQ", this.adrNum); //selRow.ADDRESS_NUM
					aFilter.push(MasterAddrNum);
					var ClearOnUncheck = new Filter("ClearOnUncheck", "EQ", bCheckSel); //selRow.ADDRESS_NUM
					aFilter.push(ClearOnUncheck);
					if (this.getView().byId("BP").getValue().trim().length === 12 && this.getView().byId("Toggle2").getState()) {
						var DefaultBpOn = new Filter("DefaultBpOn", "EQ", "X");
						aFilter.push(DefaultBpOn);
					}

					var sCommMode = "";
					if (selPref === "Email") {
						sCommMode = new Filter("BpPrefEmail", "EQ", true);
					} else if (selPref === "Phone Number") {
						sCommMode = new Filter("BpPrefMobile", "EQ", true);
					} else if (selPref === "Mail") {
						sCommMode = new Filter("BpPrefPostal", "EQ", true);
					}
					aFilter.push(sCommMode);

					oCPModel.read(getCommPrefSet, {
						async: true,
						filters: aFilter,
						success: jQuery.proxy(this.getPrefData, this),
						error: jQuery.proxy(this.oError, this)
					});
				}

			},

			getPrefData: function (oData, oResponse) {
				var aDisplayCPs = [];
				if (oData.results.length > 0) {
					var aContactPersons = oData.results;
					if (this.selPref === "Email") {
						for (var a = 0; a < aContactPersons.length; a++) {
							var oEmailDisplayCPs = {
								sFullName: "",
								sCommType: "",
								sPreference: "",
								sModeOfComm: "Email",
								AddressNum: aContactPersons[a].AddressNum,
								BpCa: aContactPersons[a].BpCa,
								BusinessPartner: aContactPersons[a].BusinessPartner,
								Ca: aContactPersons[a].Ca,
								Consnumber: aContactPersons[a].Consnumber,
								ContactFullName: aContactPersons[a].ContactFullName,
								ContactPersons: aContactPersons[a].ContactPersons,
								Email: aContactPersons[a].Email,
								EmailFlag: aContactPersons[a].EmailFlag,
								MobileFlag: aContactPersons[a].MobileFlag,
								Phone: aContactPersons[a].Phone,
								PostalAddress: aContactPersons[a].PostalAddress,
								PostalFlag: aContactPersons[a].PostalFlag,
								PrefId: this.selRow.PREF_ID,
								bEnabled: this.selRow.def_email,
								bOn: aContactPersons[a].EmailCpOnly
							};
							if (aContactPersons[a].Email !== "") {
								oEmailDisplayCPs.sFullName = aContactPersons[a].ContactFullName;
								oEmailDisplayCPs.sCommType = aContactPersons[a].Email;
								oEmailDisplayCPs.sPreference = aContactPersons[a].EmailFlag;
								aDisplayCPs.push(oEmailDisplayCPs);
							}

						}
					} else if (this.selPref === "Phone Number") {
						for (var b = 0; b < aContactPersons.length; b++) {
							var oPhoneDisplayCPs = {
								sFullName: "",
								sCommType: "",
								sPreference: "",
								sModeOfComm: "Phone Number",
								AddressNum: aContactPersons[b].AddressNum,
								BpCa: aContactPersons[b].BpCa,
								BusinessPartner: aContactPersons[b].BusinessPartner,
								Ca: aContactPersons[b].Ca,
								Consnumber: aContactPersons[b].Consnumber,
								ContactFullName: aContactPersons[b].ContactFullName,
								ContactPersons: aContactPersons[b].ContactPersons,
								Email: aContactPersons[b].Email,
								EmailFlag: aContactPersons[b].EmailFlag,
								MobileFlag: aContactPersons[b].MobileFlag,
								Phone: aContactPersons[b].Phone,
								PostalAddress: aContactPersons[b].PostalAddress,
								PostalFlag: aContactPersons[b].PostalFlag,
								PrefId: this.selRow.PREF_ID,
								bEnabled: this.selRow.def_sms,
								bOn: aContactPersons[b].MobileCpOnly
							};
							if (aContactPersons[b].Phone !== "") {
								oPhoneDisplayCPs.sFullName = aContactPersons[b].ContactFullName;
								oPhoneDisplayCPs.sCommType = aContactPersons[b].Phone;
								oPhoneDisplayCPs.sPreference = aContactPersons[b].MobileFlag;
								aDisplayCPs.push(oPhoneDisplayCPs);
							}

						}
					} else if (this.selPref === "Mail") {
						for (var c = 0; c < aContactPersons.length; c++) {
							var oMailDisplayCPs = {
								sFullName: "",
								sCommType: "",
								sPreference: "",
								sModeOfComm: "Mail",
								AddressNum: aContactPersons[c].AddressNum,
								BpCa: aContactPersons[c].BpCa,
								BusinessPartner: aContactPersons[c].BusinessPartner,
								Ca: aContactPersons[c].Ca,
								Consnumber: aContactPersons[c].Consnumber,
								ContactFullName: aContactPersons[c].ContactFullName,
								ContactPersons: aContactPersons[c].ContactPersons,
								Email: aContactPersons[c].Email,
								EmailFlag: aContactPersons[c].EmailFlag,
								MobileFlag: aContactPersons[c].MobileFlag,
								Phone: aContactPersons[c].Phone,
								PostalAddress: aContactPersons[c].PostalAddress,
								PostalFlag: aContactPersons[c].PostalFlag,
								PrefId: this.selRow.PREF_ID,
								bEnabled: this.selRow.def_post,
								bOn: aContactPersons[c].PostalCpOnly
							};
							if (aContactPersons[c].PostalAddress !== "") {
								oMailDisplayCPs.sFullName = aContactPersons[c].ContactFullName;
								oMailDisplayCPs.sCommType = aContactPersons[c].PostalAddress;
								oMailDisplayCPs.sPreference = aContactPersons[c].PostalFlag;
								aDisplayCPs.push(oMailDisplayCPs);
							}

						}
					}
				}

				// var oCPPrefModel = new JSONModel();
				// oCPPrefModel.setData(aDisplayCPs);
				this.bOn = false;
				this.bEnableEdit = false;
				if (aDisplayCPs.length > 0) {
					this.bOn = aDisplayCPs[0].bOn;
					if (aDisplayCPs[0].bEnabled) {
						this.bEnableEdit = true;
					} else {
						this.bEnableEdit = false;
					}

				}
				this.getView().setModel(new JSONModel({
					aPrefData: aDisplayCPs,
					bOn: this.bOn,
					bEnableEdit: this.bEnableEdit
				}), "oPrefModel");
				// this.getView().byId("contPref").setModel(oCPPrefModel, "oCPPrefModel");
				this.getView().addDependent(this._contPersonPopup);
				this._contPersonPopup.open();
				this.getView().byId("cpPrefError").setVisible(false);

			},

			onContCommPrefSaveCancel: function () {
				this._contPersonPopup.close();
			},

			onContCommPrefSave: function () {
				var aContPrefs = this.getView().getModel("oPrefModel").getProperty("/aPrefData");
				var that = this;
				this.bAtleastOnePref = false;
				if (aContPrefs.length > 0) {
					aContPrefs.forEach(function (obj) {
						if (obj.sModeOfComm === "Email") {
							obj.EmailFlag = obj.sPreference;
							obj.EmailCpOnly = that.getView().getModel("oPrefModel").getProperty("/bOn");
							if (!obj.EmailCpOnly) {
								obj.EmailCpOff = true;
							}
							obj.BpPrefEmail = true;
							obj.BpPrefMobile = false;
							obj.BpPrefPostal = false;
							// obj.MobileCpOnly = false;
							// obj.PostalCpOnly = false;
						} else if (obj.sModeOfComm === "Phone Number") {
							obj.MobileFlag = obj.sPreference;
							obj.MobileCpOnly = that.getView().getModel("oPrefModel").getProperty("/bOn");
							if (!obj.MobileCpOnly) {
								obj.MobileCpOff = true;
							}
							obj.BpPrefEmail = false;
							obj.BpPrefMobile = true;
							obj.BpPrefPostal = false;
							// obj.EmailCpOnly = false;
							// obj.PostalCpOnly = false;
						} else if (obj.sModeOfComm === "Mail") {
							obj.PostalFlag = obj.sPreference;
							obj.PostalCpOnly = that.getView().getModel("oPrefModel").getProperty("/bOn");
							if (!obj.PostalCpOnly) {
								obj.PostalCpOff = true;
							}
							obj.BpPrefEmail = false;
							obj.BpPrefMobile = false;
							obj.BpPrefPostal = true;
							// obj.EmailCpOnly = false;
							// obj.MobileCpOnly = false;
						}
						if (!that.bAtleastOnePref) {
							if (obj.sPreference) {
								that.bAtleastOnePref = true;
							}
						}
						delete obj.sFullName;
						delete obj.sCommType;
						delete obj.sPreference;
						delete obj.sModeOfComm;
						delete obj.bEnabled;
						delete obj.bOn;
						delete obj.bEnableEdit;

					});
				}
				var commEntitySet = "/ContactPreferenceUpdInpSet";
				var updateData = {
					BpCa: this.getView().byId("BP").getValue(),
					MasterAddrNum: this.adrNum, //this.selRow.ADDRESS_NUM
					ContactPersonNav: aContPrefs
				};
				var oManifestEntry2 = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_GET_ADDRESS_SRV.uri;
				var oModel2 = new sap.ui.model.odata.ODataModel(oManifestEntry2, {
					async: true
				});
				oModel2.create(commEntitySet, updateData, {
					success: jQuery.proxy(this.savePreferences, this),
					error: jQuery.proxy(this.oError, this)
				});
				this._contPersonPopup.close();
			},

			savePreferences: function () {

				if (this.bAtleastOnePref) {
					if (this.selPref === "Email") {
						this.selRow.EMAIL_ICON_FLG = "X";
					} else if (this.selPref === "Phone Number") {
						this.selRow.MOBILE_ICON_FLG = "X";
					} else if (this.selPref === "Mail") {
						this.selRow.POSTAL_ICON_FLG = "X";
					}
				} else {
					if (this.selPref === "Email") {
						this.selRow.EMAIL_ICON_FLG = "";
					} else if (this.selPref === "Phone Number") {
						this.selRow.MOBILE_ICON_FLG = "";
					} else if (this.selPref === "Mail") {
						this.selRow.POSTAL_ICON_FLG = "";
					}
				}

				this.getView().byId("PL1").getModel("PREFERENCE").refresh(true);

				sap.m.MessageToast.show("Preferences saved successfully");
			},

			onCPToggle: function (oEvent) {
				// sap.m.MessageToast.show("Toggled");
				var bAtleastOnePrefExists = false;
				if (oEvent.getSource().getState()) {
					var cpData = this.getView().getModel("oPrefModel").getProperty("/aPrefData");
					for (var a = 0; a < cpData.length; a++) {
						if (cpData[a].sPreference) {
							bAtleastOnePrefExists = true;
							break;
						}
					}
					if (!bAtleastOnePrefExists) {
						oEvent.getSource().setState(false);
						this.getView().byId("cpPrefError").setVisible(true);
					} else {
						this.getView().byId("cpPrefError").setVisible(false);
					}
				} else {
					this.getView().byId("cpPrefError").setVisible(false);
				}

			},

			iconColorFormatter: function (cbSel, bPrefExists) {
				if (cbSel) {
					if (bPrefExists === "X") {
						return 'green';
					} else {
						return 'black';
					}
				} else {
					return 'darkgray';
				}
			},

			onMasterPrefSel: function (oEvent) {

				if (!oEvent.getSource().getSelected()) {
					var selCol = oEvent.getSource().getParent().data("colType");
					var selPath = oEvent.getSource().getParent().getParent().getParent().getBindingContextPath();
					var selRow = this.getView().byId("PL1").getModel("PREFERENCE").getProperty(selPath);
					if (selCol === "Email" && selRow.EMAIL_ICON_FLG === "X") {
						selRow.EMAIL_ICON_FLG = "";
					} else if (selCol === "Text" && selRow.MOBILE_ICON_FLG === "X") {
						selRow.MOBILE_ICON_FLG = "";
					} else if (selCol === "Mail" && selRow.POSTAL_ICON_FLG === "X") {
						selRow.POSTAL_ICON_FLG = "";
					}

				}
				this.getView().byId("PL1").getModel("PREFERENCE").refresh(true);
			},

			onRelPrefSel: function (oEvent) {
				var bAtleastOnePrefExists = false;
				if (!oEvent.getSource().getSelected()) {
					var cpData = this.getView().getModel("oPrefModel").getProperty("/aPrefData");
					for (var a = 0; a < cpData.length; a++) {
						if (cpData[a].sPreference) {
							bAtleastOnePrefExists = true;
							break;
						}
					}
					if (!bAtleastOnePrefExists) {
						for (var b = 0; b < cpData.length; b++) {
							cpData[b].bOn = false;
						}
						oEvent.getSource().getModel("oPrefModel").setProperty("/bOn", false);
					}
				} else {
					this.getView().byId("cpPrefError").setVisible(false);
				}
				this.getView().getModel("oPrefModel").refresh(true);
			},

			onContAdd: function () {
				if (!this._contAdd) {
					this._contAdd = sap.ui.xmlfragment(this.getView().getId(),
						"ZPREFCNTR_v2.Fragments.AddNewContact", this);

				}
				this.getView().addDependent(this._contAdd);
				this._contAdd.open();
			},

			onContSave: function () {
				this.getView().setModel(new JSONModel({
					sFname: "",
					sLName: "",
					sPhone: "",
					sEmail: "",
					SRelType: ""
				}), "oContModel");
				this._contAdd.close();
			},

			onContCancel: function () {
				this.getView().setModel(new JSONModel({
					sFname: "",
					sLName: "",
					sPhone: "",
					sEmail: "",
					SRelType: ""
				}), "oContModel");
				this._contAdd.close();
			},
			onChangePhone: function (oEvent) {
				if (oEvent.getSource().getValue() !== "") {
					oEvent.getSource().setValueState("None");
				}
			},
			onContactEdit: function (oEvent) {
				var sPath = oEvent.getSource().getParent().getBindingContextPath();
				var selRow = oEvent.getSource().getModel("oContactPersonData").getProperty(sPath);
				this.getView().setModel(new JSONModel({
					sFname: selRow.ContactFirstName,
					sLName: selRow.ContactLastName,
					sPhone: selRow.Email,
					sEmail: selRow.Phone,
					SRelType: selRow.Relationship
				}), "oContEditModel");
				if (!this._contEdit) {
					this._contEdit = sap.ui.xmlfragment(this.getView().getId(),
						"ZPREFCNTR_v2.Fragments.EditContact", this);

				}
				this.getView().addDependent(this._contEdit);
				this._contEdit.open();

			},

			onContEditSave: function () {
				this._contEdit.close();
			},

			onContEditCancel: function () {
				this._contEdit.close();
			},
			onSearch1: function () {
				var oApp = this.getView().byId("idApp");
				oApp.to(oApp.getPages()[1]);
				var bpCA = this.getView().byId("businessPartnerIdInput").getValue();
				this.getView().byId("BP").setValue(bpCA);
				this.handleSearch();
			},

			onPrefAdd: function () {
				this.getView().setModel(new JSONModel({
					sPref: "",
					bEmail: false,
					bMobile: false,
					bMail: false,
					iDefaultPrefSel: -1,
					sError: ""
				}), "oAddPrefModel");
				if (!this._prefAdd) {
					this._prefAdd = sap.ui.xmlfragment(this.getView().getId(),
						"ZPREFCNTR_v2.Fragments.AddPreferences", this);

				}
				this.getView().addDependent(this._prefAdd);
				this._prefAdd.open();
			},
			
			onPrefLiveChange: function(oEvent){
				oEvent.getSource().setValue(oEvent.getSource().getValue().toUpperCase());
			},

			onAddPrefSave: function (oEvent) {
				var aNewPrefData = this.getView().getModel("oAddPrefModel").getData();
				var bValid = this.validateNewPrefData(aNewPrefData);
				if (bValid) {
					this.getView().getModel("oAddPrefModel").refresh(true);
					return;
				} else {
					this.saveNewPreference(aNewPrefData);
					this._prefAdd.close();
				}

			},

			validateNewPrefData: function (aNewPrefData) {
				if (aNewPrefData.sPref.trim() === "") {
					aNewPrefData.sError = "Please Enter a valid Preference";
				} else if (!aNewPrefData.bEmail && !aNewPrefData.bMobile && !aNewPrefData.bMail) {
					aNewPrefData.sError = "Please select at least one Allowed Mode of Communication";
				} else if (aNewPrefData.iDefaultPrefSel < 0) {
					aNewPrefData.sError = "Please select Default Preference";
				} else {
					aNewPrefData.sError = "";
				}
				this.getView().getModel("oAddPrefModel").refresh(true);
				if (aNewPrefData.sError.length > 0) {
					return true;
				} else {
					return false;
				}

			},
			
			saveNewPreference: function(aNewPrefData){
				var sDefaultComm = "";
				if(aNewPrefData.iDefaultPrefSel === 0){
					sDefaultComm = "E";
				} else if(aNewPrefData.iDefaultPrefSel === 1){
					sDefaultComm = "S";
				} else if(aNewPrefData.iDefaultPrefSel === 2){
					sDefaultComm = "P";
				}
				var aNewPrefPayload = {
					Mandt: "200",
					PrefText: aNewPrefData.sPref,
					DefaultComm: sDefaultComm,
					EmailFlag: aNewPrefData.bEmail,
					SmsFlag: aNewPrefData.bMobile,
					PostFlag: aNewPrefData. bMail
				}
				var addNewPrefSet = "/CreatePreferenceSet";
				var oManifestEntryAddNewPref = this.getOwnerComponent().getManifestEntry("sap.app").dataSources.ZPC_GET_ADDRESS_SRV.uri;
				var oModelAddNewPref = new sap.ui.model.odata.ODataModel(oManifestEntryAddNewPref, {
					async: true
				});
				oModelAddNewPref.create(addNewPrefSet, aNewPrefPayload, {
					success: jQuery.proxy(this.addNewPrefResults, this),
					error: jQuery.proxy(this.oError, this)
				});
				
			},
			
			addNewPrefResults: function(oData, oResponse){
				var bp = this.getView().byId("BP").getValue();
				var path_pref = "/PrefUserDataSet?$filter=CA_BP_NUM eq '" + bp + "' and ADDRESS_NUM eq '" + this.adrNum +
					"' and CONSNUMBER eq '" + this.CONSNUMBER + "'";
				this.GetPreference(path_pref);
				sap.m.MessageToast.show("New Pref Added");
			},

			onAddPrefCancel: function () {
				this._prefAdd.close();
			}
		});
	});