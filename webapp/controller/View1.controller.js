sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	var oView, oViewTwo, oThis, gSelectedModel, gSelectedRequestModel, gSelectedTeamModel;
	return Controller.extend("Training.Training.controller.View1", {
		onInit: function () {
			this.loadCategory();

			var categorySelect = this.byId("categorySelect");
			var oFilters = new sap.ui.model.Filter("PfNum", sap.ui.model.FilterOperator.EQ, "Category");

			var model = new sap.ui.model.json.JSONModel({
				data: []
			});

			// End of callstack as we want to map names from Persons and want that to finish first
			setTimeout(function () {

			}, 0);

		},

		onSave: function (oEvent) {
			debugger;
			var createPerson = this.getView().getModel();
			var newProduct = new sap.ui.model.json.JSONModel();
			var price = this.getView().byId("ProductPrice").getValue();
			price = parseFloat(price);
			var createArray = {
				Name: this.getView().byId("ProductName").getValue().toString(),
				Category: this.getView().byId("categorySelect2").getSelectedItem().getText().toString(),
				SupplierID: this.getView().byId("supplierIDSelect").getSelectedItem().getText().toString(),
				Price: price,
				CurrencyCode: this.getView().byId("idSelectModel2").getSelectedItem().getText().toString(),
			};
			newProduct.setData(createArray);

			createPerson.create("/ProductSet", createArray, {
				success: function (oData) {
					return (console.log(Success))
				},
				error: function (oError) {
					return (console.log(oError))
				}
			});
		},

		loadCategory: function () {

			var getCategory = this.getView().getModel();
			oView = this.getView();

			getCategory.read("/ProductSet", {
				success: function (oData, oResponse) {

					var persons = oData.results;
					var oModelPersons = new sap.ui.model.json.JSONModel();
					var oModelCategory = new sap.ui.model.json.JSONModel();
					var oModelCurrencyCode = new sap.ui.model.json.JSONModel();
					oModelPersons.setData(persons);

					//Full response from read
					oView.setModel(oModelPersons, "zzz");

					var category = oModelPersons.oData;
					var currencyCode = oModelPersons.oData;

					// Map unique category and currencycodes for select inputs
					category = category.map(item => item.Category).filter((value, index, self) => self.indexOf(value) === index);
					currencyCode = currencyCode.map(item => item.CurrencyCode).filter((value, index, self) => self.indexOf(value) === index);

					var arr = [];
					for (var i = 0; i < category.length; i++) {
						arr.push({
							key: i,
							Category: category[i]
						});
					}

					var arrTwo = [];
					for (var i = 0; i < currencyCode.length; i++) {
						arrTwo.push({
							Key: i,
							CurrencyCode: currencyCode[i]
						});
					}

					oModelCategory.setData(arr);
					oModelCurrencyCode.setData(arrTwo);

					oView.setModel(oModelCategory, "selectCategory");
					oView.setModel(oModelCurrencyCode, "selectCurrencyCode");

					// Research after refresh so that filter is not ignored
					setTimeout(function () {

					}, 0);
					return (console.log(oView.getModel("zzz").getData(), currencyCode))
				},
				error: function (oError) {
					console.log(oError);
				}

			});
		},

	});
});