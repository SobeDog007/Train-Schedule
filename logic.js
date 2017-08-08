// Steven Sober
// 08/03/2017
// Homework-08
// logic.js

// This file contains the Javascript logic for the Train Schedule homework.

$( document ).ready(function() {

	// Initialize Firebase
	var config = {
	   apiKey: "AIzaSyBhbHo6xOXpRiJbNxGAjZHNXGpXZNuFuF0",
	   authDomain: "train-schedule-e3a46.firebaseapp.com",
	   databaseURL: "https://train-schedule-e3a46.firebaseio.com",
	   projectId: "train-schedule-e3a46",
	   storageBucket: "train-schedule-e3a46.appspot.com",
	   messagingSenderId: "958047865546"
	};

	firebase.initializeApp(config);

	// Create a variable to reference the database.
	var database = firebase.database();

	// Initial Values
	var trainNameInput   = "";
	var destinationInput = "";
	var firstTrainInput  = "";
	var frequencyInput   = "";

	// Capture Button Click
	$("#add-train").on("click", function(event) {

	   event.preventDefault();

	   console.log("In the Add Train code!");

	   // Get the "Add Train" input values.
	   trainNameInput   = $("#train-name-input").val().trim();
	   destinationInput = $("#destination-input").val().trim();
	   firstTrainInput  = $("#first-train-input").val().trim();
	   frequencyInput   = $("#frequency-input").val().trim();

	   // Console log the input fields.
	   console.log("Input Train Name: " + trainNameInput);
	   console.log("Input Destination: " + destinationInput);
	   console.log("First Train Input: " + firstTrainInput);
	   console.log("Frequency Input: " + frequencyInput);

	   // Push the new train to Firebase.
	   database.ref().push({

	   	trainName:   trainNameInput,
	     	destination: destinationInput,
	     	firstTrain:  firstTrainInput,
	     	frequency:   frequencyInput,
	     	dateAdded:   firebase.database.ServerValue.TIMESTAMP
	   });

	   console.log("Firebase updated!");

	   // Clear the input fields.
		$("#train-name-input").val("");
	   $("#destination-input").val("");
	   $("#first-train-input").val("");
	   $("#frequency-input").val("");
	});

	// Firebase event listener.
	//database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
	//database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

		// Console log the childSnapshot object.
		console.log(childSnapshot.val());

		// Create variables for each part of the train data in the database.
		var trainName   = childSnapshot.val().trainName;
		var destination = childSnapshot.val().destination;
		var firstTrain  = childSnapshot.val().firstTrain;
		var frequency   = childSnapshot.val().frequency;

	   // Console log the train data elements.
	   console.log("Train Entry - Name: " + trainName);
	   console.log("Train Entry - Dest: " + destination);
	   console.log("Train Entry - Time: " + firstTrain);
	   console.log("Train Entry - Freq: " + frequency);

	   // Calculate the next train arrival time and minutes until arrival.
	   var nowTime = moment().format("HH:mm");
	   
	   console.log(nowTime);

	   var firstTrainTime = moment(firstTrain);

	   console.log(firstTrainTime);

	   var hourDiff = nowTime.diff(firstTrainTime, "hours");

	   console.log(hourDiff);

	   var nextArrival = 0;

	   console.log (nextArrival);

	   var arrivalMinutes = 0;

	   console.log(arrivalMinutes);

	  // Display the train information in a new row in the table.
	  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
	  frequency + "</td><td>" + nextArrival + "</td><td>" + arrivalMinutes + "</td></tr>");

	   // Handle the errors
	 }, function(errorObject) {
	   console.log("Errors handled: " + errorObject.code);
	 });
});