
// Import D3 Library 
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Declare Global Variables which will be used to store loaded CSV files
var industry;
var finance;
var education;

// Declare width and height variables for SVG
var width = 500;
var height = 500;


var dataset = [ 0, 1, 5, 10, 15, 20, 25, 30, 35 ];
d3.select("body").selectAll("p")
    .data(dataset)
    .enter()
    .append("p")
    .text(function(d) { return d; });
console.log(dataset);

/*
// Load CSV files and use the callback function to store data in global variables and use external functions

// Industry - Load File into global var, test success, and call external functions
d3.csv("../datasets/US_Census_Data/test.csv", function(data) {
    industry = data;
    console.log(data);

    d3.select("body").selectAll("p")
        .data(data)
        .enter()
        .append("p")
        .text("New paragraph!");


    // Create SVG
    //createSVG();
    // Append Rects using data
    //appendRect(svg, industry);
});

// Finance - Load File into global var, test success, and call external functions
d3.csv("../datasets/US_Census_Data/Finance.csv", function (financeData) {

    finance = financeData;
    //External Functions Here
    
});

// Education - Load File into global var, test success, and call external functions
d3.csv("../datasets/US_Census_Data/Education.csv", function (educationData) {



    education = educationData;
    //External Functions Here

});


// Create an SVG
function createSVG () {
    // Create SVG element
    var svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
    // Return the SVG pointer
    return svg;
}

// Append Rects to svg
function appendRect (svg, industry) {
    //Add Rects to SVG
    svg.selectAll("rect")
    .data(industry)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 2)
    .attr("height", 1);
}
*/