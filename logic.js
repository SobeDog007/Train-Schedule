// Steven Sober
// 08/03/2017
// Homework-08
// logic.js

// This file contains the Javascript logic for the Train Schedule homework.

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
   console.log(trainNameInput);
   console.log(destinationInput);
   console.log(firstTrainInput);
   console.log(frequencyInput);

   // Push the new train to Firebase.
   database.ref().push({

   	trainName:   trainNameInput,
     	destination: destinationInput,
     	firstTrain:  firstTrainInput,
     	frequncy:    frequencyInput,
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
   console.log(trainName);
   console.log(destination);
   console.log(firstTrain);
   console.log(frequency);

   // Calculate the next train arrival time and minutes until arrival.
   var nextArrival = 0;

   console.log (nextArrival);

   var arrivalMinutes = 0;

   console.log(arrivalMinutes);

   // Display the train information in a new row in the table.
   // $(".tbody").append("<div class='table'><span id='trainName'> " + sv.val().trainName +
   // 	" </span><span id='destination'> " + sv.val().destination +
   //    " </span><span id='frequency'> " + sv.val().frequency +
   //    " </span><span id=''> " + nextArrival + " </span></div>");

  // Add each train's data into the table.
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + arrivalMinutes + "</td></tr>");


   // Change the HTML to reflect
   // $("#name-display").html(sv.trainName);
   // $("#email-display").html(sv.destination);
   // $("#age-display").html(sv.firstTrain);
   // $("#comment-display").html(sv.frequency);

   // Handle the errors
 }, function(errorObject) {
   console.log("Errors handled: " + errorObject.code);
 });
