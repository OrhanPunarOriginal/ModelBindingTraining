sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	var oView, oThis, gSelectedModel, gSelectedRequestModel, gSelectedTeamModel;
	return Controller.extend("Training.Training.controller.View1", {
		onInit: function () {
			this.loadCategory();
			var model = new sap.ui.model.json.JSONModel({
				data: []
			});

			// End of callstack as we want to map names from Persons and want that to finish first
			setTimeout(function () {

			}, 0);

		},
		loadCategory: function () {

			var getCategory = this.getView().getModel();
			oView = this.getView();
			getCategory.read("/ProductSet", {
				success: function (oData, oResponse) {

					var persons = oData.results;
					var oModelPersons = new sap.ui.model.json.JSONModel();
					oModelPersons.setData(persons);
					oView.setModel(oModelPersons, "zzz");

					// Research after refresh so that filter is not ignored
					setTimeout(function () {

					}, 0);
					return (console.log(oView.getModel("zzz").getData()))
				},
				error: function (oError) {
					console.log(oError);
				}

			});
		},

	});
});