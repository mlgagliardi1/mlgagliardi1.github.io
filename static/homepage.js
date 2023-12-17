            
// Declare Global Variables which will be used to store loaded CSV files
var allData;
var selectedData;
var selectedYear;
var XdomainKeys;
var YdomainKeys;
var SVGwidth;
var SVGheight;
var width;
var height;
var margin;
var barPadding = 1;
var rectWidth = 2;
var rectHeight = 75;


//          FUNCTIONS
// Assign the selected year to global var + error catching
function datasetSelection (year) {
    selectedYear = year;
    if (selectedYear == "2020" || selectedYear == "2021") {
        educationInit();
    } else {
        alert("An error has occurred! Please reload the page.");
    }
}


// _Init_ Function laying out chart options
function educationInit() {
    let container = document.getElementById("dynamicOptions");
    container.innerHTML = "";

    // Graph Options Header
    let optHead = document.createElement("h4");
        optHead.setAttribute("id", "optHead");
        optHead.setAttribute("style", "margin: 2rem 0 0 0;")
    let center = document.createElement("center");
    let headTXT = document.createTextNode("Graph Options");
    let divider = document.createElement("div");
        divider.setAttribute("class", "divider");
    optHead.appendChild(center.appendChild(headTXT));
    container.appendChild(optHead);
    container.appendChild(divider);

    // X-Axis
    let Xselect = document.createElement("select");
        Xselect.setAttribute("id", "Xselect");        
        Xselect.setAttribute("name", "Xselect");
    let Xlabel = document.createElement("label");
        Xlabel.setAttribute("id", "Xlabel");
        Xlabel.setAttribute("for", "Xselect");
        let txt1 = document.createTextNode("Data");
        Xlabel.appendChild(txt1);
    let Xopt0 = document.createElement("option");
        Xopt0.setAttribute("value", "");
        let txt0 = document.createTextNode("");
        Xopt0.appendChild(txt0);
    let Xopt1 = document.createElement("option");
        Xopt1.setAttribute("value", "degrees");
        let txt2 = document.createTextNode("Advanced Degrees");
        Xopt1.appendChild(txt2);
    let Xopt2 = document.createElement("option");
        Xopt2.setAttribute("value", "HSGrads");
        let txt3 = document.createTextNode("High School Graduates");
        Xopt2.appendChild(txt3);
    let Xopt3 = document.createElement("option");
        Xopt3.setAttribute("value", "noDegrees");
        let txt8 = document.createTextNode("Did not Graduate HS");
        Xopt3.appendChild(txt8);


    // Append children to form1 and container
    let form1 = document.createElement("form");
        form1.setAttribute("action", "javascript");
        form1.setAttribute("onsubmit", "return parseEducationCSV();");
    let submit = document.createElement("input");
        submit.setAttribute("id", "submit");
        submit.setAttribute("type", "submit");
        submit.setAttribute("style", "margin: 0.5rem auto 1rem 0;");
        submit.setAttribute("value", "Create Graph!");
    let br1 = document.createElement("br");
    Xselect.appendChild(Xopt0);
    Xselect.appendChild(Xopt1);
    Xselect.appendChild(Xopt2);
    Xselect.appendChild(Xopt3);
    form1.appendChild(Xlabel);
    form1.appendChild(Xselect);
    form1.appendChild(br1);
    form1.appendChild(submit);
    container.appendChild(form1);

    // Graph Options Header
    let sortHead = document.createElement("h4");
        sortHead.setAttribute("id", "sortHead");
        sortHead.setAttribute("style", "margin: 2rem 0 0 0;")
    let center2 = document.createElement("center");
    let headTXT2 = document.createTextNode("Sort");
    let divider2 = document.createElement("div");
        divider2.setAttribute("class", "divider");
    sortHead.appendChild(center2.appendChild(headTXT2));
    container.appendChild(sortHead);
    container.appendChild(divider2);

    // Add the sort option
    let sortOpt1 = document.createElement("input");
        sortOpt1.setAttribute("id", "sortOpt1");
        sortOpt1.setAttribute("type", "radio");        
        sortOpt1.setAttribute("name", "sort");
        sortOpt1.setAttribute("value", "ascending");
        sortOpt1.setAttribute("onchange", "sortData();");
    let sortOpt1Label = document.createElement("label");
        sortOpt1Label.setAttribute("id", "sortOpt1Label");
        sortOpt1Label.setAttribute("for", "sortOpt1");
            let txt4 = document.createTextNode("Ascending");
        sortOpt1Label.appendChild(txt4);
    let sortOpt2 = document.createElement("input");
        sortOpt2.setAttribute("id", "sortOpt2");
        sortOpt2.setAttribute("type", "radio");           
        sortOpt2.setAttribute("name", "sort");
        sortOpt2.setAttribute("value", "descending");
        sortOpt2.setAttribute("onchange", "sortData();");
    let sortOpt2Label = document.createElement("label");
        sortOpt2Label.setAttribute("id", "sortOpt2Label");
        sortOpt2Label.setAttribute("for", "sortOpt2");
            let txt5 = document.createTextNode("Descending");
        sortOpt2Label.appendChild(txt5);
    let sortOpt3 = document.createElement("input");
        sortOpt3.setAttribute("id", "sortOpt3");
        sortOpt3.setAttribute("type", "radio");           
        sortOpt3.setAttribute("name", "sort");
        sortOpt3.setAttribute("value", "random");
        sortOpt3.setAttribute("onchange", "sortData();");
        sortOpt3.setAttribute("checked", "checked");
    let sortOpt3Label = document.createElement("label");
        sortOpt3Label.setAttribute("id", "sortOpt3Label");
        sortOpt3Label.setAttribute("for", "sortOpt3");
            let txt6 = document.createTextNode("Random");
        sortOpt3Label.appendChild(txt6);

    // Append children to form1 and container
    let form2 = document.createElement("form");
        form2.setAttribute("id", "sortForm");
        form2.setAttribute("action", "javascript");
        form2.setAttribute("onsubmit", "return sortData();");
    let br2 = document.createElement("br");
    let br3 = document.createElement("br");

    form2.appendChild(sortOpt1);
    form2.appendChild(sortOpt1Label);
    form2.appendChild(br2);
    form2.appendChild(sortOpt2);
    form2.appendChild(sortOpt2Label);
    form2.appendChild(br3);
    form2.appendChild(sortOpt3);
    form2.appendChild(sortOpt3Label);
    container.appendChild(form2);
}


// Parse education.CSV
function parseEducationCSV () {
    // Store user's input in local vars
    let Xselect = document.getElementById("Xselect");
    var option = Xselect.value;
    
    //          DRIVER
    if (option == "degrees") {
        //      YEAR = 2020
        if (selectedYear == "2020") {
            d3.csv("./datasets/US_Census_Data/Education_Year_State_BorHigher_2020.csv", function (data) {
                selectedData = data.map((d) => {
                    return {Year:d.Year, State:d.cd.slice(-2), BorHigher:d.Bachelors_degree_or_higher};
                });
                // Set Keys for Axes
                XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                yMax = 0;
                for (var i=0; i<selectedData.length; i++) {
                    if ((selectedData[i].BorHigher / 100000) >= yMax) {
                        yMax = (selectedData[i].BorHigher / 100000);
                    }
                }                
                YdomainKeys = ([0, yMax]);
                //  Create the chart and display the title and about data
                createADVDegreeChart(selectedData, XdomainKeys, YdomainKeys);
                addChartTitle ("advDegrees2020");
                addChartAbout ("advDegrees2020");
            });
        //      YEAR = 2021
        } else if (selectedYear == "2021") {
            d3.csv("./datasets/US_Census_Data/Education_Year_State_BorHigher_2021.csv", function (data) {
                selectedData = data.map((d) => {
                    return {Year:d.Year, State:d.cd.slice(-2), BorHigher:d.Bachelors_degree_or_higher};
                });
                // Set Keys for Axes
                XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                yMax = 0;
                for (var i=0; i<selectedData.length; i++) {
                    if ((selectedData[i].BorHigher / 100000) >= yMax) {
                        yMax = (selectedData[i].BorHigher / 100000);
                    }
                }                
                YdomainKeys = ([0, yMax]);
                // Create the chart and display the title and about data
                createADVDegreeChart(selectedData, XdomainKeys, YdomainKeys);
                addChartTitle ("advDegrees2021");
                addChartAbout ("advDegrees2021");
            });
        }
    } else if (option == "HSGrads") {
        //      YEAR = 2020
        if (selectedYear == "2020") {
            d3.csv("./datasets/US_Census_Data/Education_Year_State_HSGrads_2020.csv", function (data) {
                selectedData = data.map((d) => {
                    return {Year:d.Year, State:d.cd.slice(-2), HSGrads:d.high_school_or_some_degree};
                });
                // Set Keys for Axes
                XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                yMax = 0;
                for (var i=0; i<selectedData.length; i++) {
                    if ((selectedData[i].HSGrads / 100000) >= yMax) {
                        yMax = (selectedData[i].HSGrads / 100000);
                    }
                }                
                YdomainKeys = ([0, yMax]);
                //  Create the chart and display the title and about data
                createHSGradsChart(selectedData, XdomainKeys, YdomainKeys);
                addChartTitle ("HSGrads2020");
                addChartAbout ("HSGrads2020");
            });
        //      YEAR = 2021
        } else if (selectedYear == "2021") {
            d3.csv("./datasets/US_Census_Data/Education_Year_State_HSGrads_2021.csv", function (data) {
                selectedData = data.map((d) => {
                    return {Year:d.Year, State:d.cd.slice(-2), HSGrads:d.high_school_or_some_degree};
                });
                // Set Keys for Axes
                XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                yMax = 0;
                for (var i=0; i<selectedData.length; i++) {
                    if ((selectedData[i].HSGrads / 100000) >= yMax) {
                        yMax = (selectedData[i].HSGrads / 100000);
                    }
                }                
                YdomainKeys = ([0, yMax]);
                // Create the chart and display the title and about data
                createHSGradsChart(selectedData, XdomainKeys, YdomainKeys);
                addChartTitle ("HSGrads2021");
                addChartAbout ("HSGrads2021");
            });
        }
    } else if (option == "noDegrees") {
        //      YEAR = 2020
        if (selectedYear == "2020") {
            d3.csv("./datasets/US_Census_Data/Education_Year_State_NoDegrees_2020.csv", function (data) {
                selectedData = data.map((d) => {
                    return {Year:d.Year, State:d.cd.slice(-2), NoDegrees:d.Less_than_high_school_graduate};
                });
                // Set Keys for Axes
                XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                yMax = 0;
                for (var i=0; i<selectedData.length; i++) {
                    if ((selectedData[i].NoDegrees / 100000) >= yMax) {
                        yMax = (selectedData[i].NoDegrees / 100000);
                    }
                }                
                YdomainKeys = ([0, yMax]);
                //  Create the chart and display the title and about data
                createNoDegreesChart(selectedData, XdomainKeys, YdomainKeys);
                addChartTitle ("noDegrees2020");
                addChartAbout ("noDegrees2020");
            });
        //      YEAR = 2021
        } else if (selectedYear == "2021") {
            d3.csv("./datasets/US_Census_Data/Education_Year_State_NoDegrees_2021.csv", function (data) {
                selectedData = data.map((d) => {
                    return {Year:d.Year, State:d.cd.slice(-2), NoDegrees:d.Less_than_high_school_graduate};
                });
                // Set Keys for Axes
                XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                yMax = 0;
                for (var i=0; i<selectedData.length; i++) {
                    if ((selectedData[i].NoDegrees / 100000) >= yMax) {
                        yMax = (selectedData[i].NoDegrees / 100000);
                    }
                }                
                YdomainKeys = ([0, yMax]);
                // Create the chart and display the title and about data
                createNoDegreesChart(selectedData, XdomainKeys, YdomainKeys);
                addChartTitle ("noDegrees2021");
                addChartAbout ("noDegrees2021");
            });
        }
    } else {
        alert("Please ensure all chart options are filled out appropriately!");
    }
    return false;
}


// Create no degrees charts
function createNoDegreesChart (selectedData, XdomainKeys, YdomainKeys) {
    //                  SVG
    // Set the SVG parameters with height/width of #chartDisplay
    let display = document.getElementById("chartDisplay");
    display.innerHTML = "";
    margin = 60;
    SVGwidth = display.offsetWidth;
    width = SVGwidth - margin;
    SVGheight = display.offsetHeight;
    height = SVGheight - margin;
    // Append the SVG to the #chartDisplay div
    var svg = d3.select("#chartDisplay")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    //                  X-Axis
    let x = d3.scaleBand()
            .domain(XdomainKeys)
            .range([0, width])
            .padding([0.5])
        svg.append("g")
            .attr("transform", "translate(" + margin + "," + (height - margin) + ")")
            .call(d3.axisBottom(x).tickSize(10));
    //                  Y-Axis
    let y = d3.scaleLinear()
        .domain(YdomainKeys)
        .range([height - (2 * margin), 0]);
    svg.append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")")
        .call(d3.axisLeft(y));
    //                  Bars
    svg.selectAll("rect")
        .data(selectedData)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.State); })
        .attr("y", function (d) { return (height - y(d.NoDegrees / 100000)); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return y(d.NoDegrees / 100000); })
        .attr("fill", function (d) { return "rgb(0, 0, " + (d.NoDegrees / 1000) + ")"})
        .attr("transform", "translate(" + margin + "," + ((-1)*margin) + ")")
        .append("title");
}


// Create HS graduates charts
function createHSGradsChart (selectedData, XdomainKeys, YdomainKeys) {
    //                  SVG
    // Set the SVG parameters with height/width of #chartDisplay
    let display = document.getElementById("chartDisplay");
    display.innerHTML = "";
    margin = 60;
    SVGwidth = display.offsetWidth;
    width = SVGwidth - margin;
    SVGheight = display.offsetHeight;
    height = SVGheight - margin;
    // Append the SVG to the #chartDisplay div
    var svg = d3.select("#chartDisplay")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    //                  X-Axis
    let x = d3.scaleBand()
            .domain(XdomainKeys)
            .range([0, width])
            .padding([0.5])
        svg.append("g")
            .attr("transform", "translate(" + margin + "," + (height - margin) + ")")
            .call(d3.axisBottom(x).tickSize(10));
    //                  Y-Axis
    let y = d3.scaleLinear()
        .domain(YdomainKeys)
        .range([height - (2 * margin), 0]);
    svg.append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")")
        .call(d3.axisLeft(y));
    //                  Bars
    svg.selectAll("rect")
        .data(selectedData)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.State); })
        .attr("y", function (d) { return (height - y(d.HSGrads / 100000)); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return y(d.HSGrads / 100000); })
        .attr("fill", function (d) { return "rgb(0, 0, " + (d.HSGrads / 1000) + ")"})
        .attr("transform", "translate(" + margin + "," + ((-1)*margin) + ")")
        .append("title");
}


// Create advanced degree charts
function createADVDegreeChart (selectedData, XdomainKeys, YdomainKeys) {
    //                  SVG
    // Set the SVG parameters with height/width of #chartDisplay
    let display = document.getElementById("chartDisplay");
    display.innerHTML = "";
    margin = 60;
    SVGwidth = display.offsetWidth;
    width = SVGwidth - margin;
    SVGheight = display.offsetHeight;
    height = SVGheight - margin;
    // Append the SVG to the #chartDisplay div
    var svg = d3.select("#chartDisplay")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    //                  X-Axis
    let x = d3.scaleBand()
            .domain(XdomainKeys)
            .range([0, width])
            .padding([0.5])
        svg.append("g")
            .attr("transform", "translate(" + margin + "," + (height - margin) + ")")
            .call(d3.axisBottom(x).tickSize(10));
    //                  Y-Axis
    let y = d3.scaleLinear()
        .domain(YdomainKeys)
        .range([height - (2 * margin), 0]);
    svg.append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")")
        .call(d3.axisLeft(y));
    //                  Bars
    svg.selectAll("rect")
        .data(selectedData)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.State); })
        .attr("y", function (d) { return (height - y(d.BorHigher / 100000)); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return y(d.BorHigher / 100000); })
        .attr("fill", function (d) { return "rgb(0, 0, " + (d.BorHigher / 1000) + ")"})
        .attr("transform", "translate(" + margin + "," + ((-1)*margin) + ")")
        .append("title");
}


// Add the chart title
function addChartTitle (chartDescription) {
        container = document.getElementById("chartTitle");
        container.innerHTML = "";
        let title = document.createElement("h2");
            title.setAttribute("style", "margin: 0; padding: 2rem 0 0 0; font-size: 2rem;"); 
        let center = document.createElement("center");
    // Bachelors+ 2021        
    if (chartDescription == "advDegrees2021") {
        let titleTXT = document.createTextNode("2021 - Bachelors Degrees by State");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // Bachelors+ 2020   
    } else if (chartDescription == "advDegrees2020") {
        let titleTXT = document.createTextNode("2020 - Bachelors Degrees by State");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // Bachelors+ 2020 Ascending
    } else if (chartDescription == "advDegrees2020-Ascending") {
        let titleTXT = document.createTextNode("2020 - Bachelors Degrees by State in Ascending Order");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // Bachelors+ 2020 Descending
    } else if (chartDescription == "advDegrees2020-Descending") {
        let titleTXT = document.createTextNode("2020 - Bachelors Degrees by State in Descending Order");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // Bachelors+ 2021 Ascending
    } else if (chartDescription == "advDegrees2021-Ascending") {
        let titleTXT = document.createTextNode("2021 - Bachelors Degrees by State in Ascending Order");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // Bachelors+ 2021 Descending
    } else if (chartDescription == "advDegrees2021-Descending") {
        let titleTXT = document.createTextNode("2021 - Bachelors Degrees by State in Descending Order");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // HSGrads 2021   
    } else if (chartDescription == "HSGrads2021") {
        let titleTXT = document.createTextNode("2021 - High School Graduates by State");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // HSGrads 2021 - Ascending 
    } else if (chartDescription == "HSGrads2021-Ascending") {
        let titleTXT = document.createTextNode("2021 - High School Graduates by State in Ascending Order");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // HSGrads 2021  - Descending  
    } else if (chartDescription == "HSGrads2021-Descending") {
        let titleTXT = document.createTextNode("2021 - High School Graduates by State in Descending Order");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // HSGrads 2020  
    } else if (chartDescription == "HSGrads2020") {
        let titleTXT = document.createTextNode("2020 - High School Graduates by State");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // HSGrads 2020 - Ascending  
    } else if (chartDescription == "HSGrads2020-Ascending") {
        let titleTXT = document.createTextNode("2020 - High School Graduates by State in Ascending Order");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // HSGrads 2020 - Descending  
    } else if (chartDescription == "HSGrads2020-Descending") {
        let titleTXT = document.createTextNode("2020 - High School Graduates by State in Descending Order");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // < HS 2021 
    } else if (chartDescription == "noDegrees2021") {
        let titleTXT = document.createTextNode("2021 - Individuals Without a HS Diploma by State");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // < HS 2021 - Ascending
    } else if (chartDescription == "noDegrees2021-Ascending") {
        let titleTXT = document.createTextNode("2021 - Individuals Without a HS Diploma by State in Ascending Order");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // < HS 2021 - Descending 
    } else if (chartDescription == "noDegrees2021-Descending") {
        let titleTXT = document.createTextNode("2021 - Individuals Without a HS Diploma by State in Descending Order");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // < HS 2020   
    } else if (chartDescription == "noDegrees2020") {
        let titleTXT = document.createTextNode("2020 - Individuals Without a HS Diploma by State");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // < HS 2020 - Ascending   
    } else if (chartDescription == "noDegrees2020-Ascending") {
        let titleTXT = document.createTextNode("2020 - Individuals Without a HS Diploma by State in Ascending Order");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    // < HS 2020 - Descending   
    } else if (chartDescription == "noDegrees2020-Descending") {
        let titleTXT = document.createTextNode("2020 - Individuals Without a HS Diploma by State in Descending Order");
            center.appendChild(titleTXT);
            title.appendChild(center);
            container.appendChild(title);
    } else {
    let titleTXT = document.createTextNode("Chart Title Error, Please Reload");
        center.appendChild(titleTXT);
        title.appendChild(center);
        container.appendChild(title);  
    }
}


// Add chart description
function addChartAbout (chartDescription) {
    // Header "About this Chart"
    container = document.getElementById("chartAbout");
    container.innerHTML = "";
    let aboutHead = document.createElement("h2");
    let center1 = document.createElement("center");
        aboutHead.setAttribute("style", "margin: 10rem 0 0 0; font-size: 1.6rem;");
        let headTXT = document.createTextNode("About this Chart");
    center1.appendChild(headTXT);
    aboutHead.appendChild(center1);
    container.appendChild(aboutHead);
    // Bachelors+ 2021
    if (chartDescription == "advDegrees2021") {
        let p = document.createElement("p");
        let center2 = document.createElement("center");
            p.setAttribute("style", "padding: 1rem; font-size: 1.2rem;")
            let pTXT = document.createTextNode("This graph shows the the amount of bachelor's degrees by state in 2021. The color variances dictate different bars, each representing a county within the state. Null values (data not accessible) are interpreted as zero, which translates to the lack of a bar (see PR). Additionally, the total amount of degrees is the Y value multiplied by 100,000.");
        center2.appendChild(pTXT);
        p.appendChild(center2);
        container.appendChild(p);
    // Bachelors+ 2020
    } else if (chartDescription == "advDegrees2020") {
        let p = document.createElement("p");
        let center2 = document.createElement("center");
            p.setAttribute("style", "padding: 1rem; font-size: 1.2rem;")
            let pTXT = document.createTextNode("This graph shows the the amount of bachelor's degrees by state in 2020. The color variances dictate different bars, each representing a county within the state. Additionally, the total amount of degrees is the Y value multiplied by 100,000.");
        center2.appendChild(pTXT);
        p.appendChild(center2);
        container.appendChild(p);
    // HSGrads 2021
    } else if (chartDescription == "HSGrads2021") {
        let p = document.createElement("p");
        let center2 = document.createElement("center");
            p.setAttribute("style", "padding: 1rem; font-size: 1.2rem;")
            let pTXT = document.createTextNode("This graph shows the the amount of high school graduates by state in 2020. The color variances dictate different bars, each representing a county within the state. Additionally, the total amount of degrees is the Y value multiplied by 100,000.");
        center2.appendChild(pTXT);
        p.appendChild(center2);
        container.appendChild(p);
    // HSGrads 2020
    } else if (chartDescription == "HSGrads2020") {
        let p = document.createElement("p");
        let center2 = document.createElement("center");
            p.setAttribute("style", "padding: 1rem; font-size: 1.2rem;")
            let pTXT = document.createTextNode("This graph shows the the amount of high school graduates by state in 2020. The color variances dictate different bars, each representing a county within the state. Additionally, the total amount of degrees is the Y value multiplied by 100,000.");
        center2.appendChild(pTXT);
        p.appendChild(center2);
        container.appendChild(p);
    // < HS 2021
    } else if (chartDescription == "noDegrees2021") {
        let p = document.createElement("p");
        let center2 = document.createElement("center");
            p.setAttribute("style", "padding: 1rem; font-size: 1.2rem;")
            let pTXT = document.createTextNode("This graph shows the the amount of people who do not have a high school diploma by state in 2020. The color variances dictate different bars, each representing a county within the state. Additionally, the total amount of degrees is the Y value multiplied by 100,000.");
        center2.appendChild(pTXT);
        p.appendChild(center2);
        container.appendChild(p);
    // < HS 2020
    } else if (chartDescription == "noDegrees2020") {
        let p = document.createElement("p");
        let center2 = document.createElement("center");
            p.setAttribute("style", "padding: 1rem; font-size: 1.2rem;")
            let pTXT = document.createTextNode("This graph shows the the amount of people who do not have a high school diploma by state in 2020. The color variances dictate different bars, each representing a county within the state. Additionally, the total amount of degrees is the Y value multiplied by 100,000.");
        center2.appendChild(pTXT);
        p.appendChild(center2);
        container.appendChild(p);
    }
}


// Add an option to sort a chart
function sortData () {
    //Store user's input in local vars
    let Xselect = document.getElementById("Xselect");
        var option = Xselect.value;
    let sort = document.querySelector('input[name="sort"]:checked').value;

    if (option == "degrees") {
        if (sort == "descending") {
            //      YEAR = 2020
            if (selectedYear == "2020") {
                d3.csv("./datasets/US_Census_Data/Education_Year_State_BorHigher_2020.csv", function (data) {
                    selectedData = data.map((d) => {
                        return {Year:d.Year, State:d.cd.slice(-2), BorHigher:d.Bachelors_degree_or_higher};
                    });
                    selectedData.sort(function (a, b) { return a.BorHigher - b.BorHigher });
                    // Set Keys for Axes
                    XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                    yMax = 0;
                    for (var i=0; i<selectedData.length; i++) {
                        if ((selectedData[i].BorHigher / 100000) >= yMax) {
                            yMax = (selectedData[i].BorHigher / 100000);
                        }
                    }                
                    YdomainKeys = ([0, yMax]);
                    // Create the chart and display the title and about data
                    createADVDegreeChart(selectedData, XdomainKeys, YdomainKeys);
                    addChartTitle ("advDegrees2020-Descending");
                    addChartAbout ("advDegrees2020");
                });
            //      YEAR = 2021
            } else if (selectedYear == "2021") {
                d3.csv("./datasets/US_Census_Data/Education_Year_State_BorHigher_2021.csv", function (data) {
                    selectedData = data.map((d) => {
                        return {Year:d.Year, State:d.cd.slice(-2), BorHigher:d.Bachelors_degree_or_higher};
                    });
                    selectedData.sort(function (a, b) { return a.BorHigher - b.BorHigher });
                    // Set Keys for Axes
                    XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                    yMax = 0;
                    for (var i=0; i<selectedData.length; i++) {
                        if ((selectedData[i].BorHigher / 100000) >= yMax) {
                            yMax = (selectedData[i].BorHigher / 100000);
                        }
                    }                
                    YdomainKeys = ([0, yMax]);
                    // Create the chart and display the title and about data
                    createADVDegreeChart(selectedData, XdomainKeys, YdomainKeys);
                    addChartTitle ("advDegrees2021-Descending");
                    addChartAbout ("advDegrees2021");
                });
            }
        } else if (sort == "ascending") {
            //      YEAR = 2020
            if (selectedYear == "2020") {
                d3.csv("./datasets/US_Census_Data/Education_Year_State_BorHigher_2020.csv", function (data) {
                    selectedData = data.map((d) => {
                        return {Year:d.Year, State:d.cd.slice(-2), BorHigher:d.Bachelors_degree_or_higher};
                    });
                    selectedData = selectedData.sort((a,b) => d3.descending(a.BorHigher, b.BorHigher));
                    // Set Keys for Axes
                    XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                    yMax = 0;
                    for (var i=0; i<selectedData.length; i++) {
                        if ((selectedData[i].BorHigher / 100000) >= yMax) {
                            yMax = (selectedData[i].BorHigher / 100000);
                        }
                    }                
                    YdomainKeys = ([0, yMax]);
                    // Create the chart and display the title and about data
                    createADVDegreeChart(selectedData, XdomainKeys, YdomainKeys);
                    addChartTitle ("advDegrees2021-Ascending");
                    addChartAbout ("advDegrees2021");
                });
            //      YEAR = 2021
            } else if (selectedYear == "2021") {
                d3.csv("./datasets/US_Census_Data/Education_Year_State_BorHigher_2021.csv", function (data) {
                    selectedData = data.map((d) => {
                        return {Year:d.Year, State:d.cd.slice(-2), BorHigher:d.Bachelors_degree_or_higher};
                    });
                    selectedData = selectedData.sort((a,b) => d3.descending(a.BorHigher, b.BorHigher));
                    // Set Keys for Axes
                    XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                    yMax = 0;
                    for (var i=0; i<selectedData.length; i++) {
                        if ((selectedData[i].BorHigher / 100000) >= yMax) {
                            yMax = (selectedData[i].BorHigher / 100000);
                        }
                    }                
                    YdomainKeys = ([0, yMax]);
                    // Create the chart and display the title and about data
                    createADVDegreeChart(selectedData, XdomainKeys, YdomainKeys);
                    addChartTitle ("advDegrees2021-Ascending");
                    addChartAbout ("advDegrees2021");
                });
            }
        } else if (sort == "random") {
            parseEducationCSV();
        }
    } else if (option == "HSGrads") {
        if (sort == "descending") {
            //      YEAR = 2020
            if (selectedYear == "2020") {
                d3.csv("./datasets/US_Census_Data/Education_Year_State_HSGrads_2020.csv", function (data) {
                    selectedData = data.map((d) => {
                        return {Year:d.Year, State:d.cd.slice(-2), HSGrads:d.high_school_or_some_degree};
                    });
                    selectedData.sort(function (a, b) { return a.HSGrads - b.HSGrads });
                    // Set Keys for Axes
                    XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                    yMax = 0;
                    for (var i=0; i<selectedData.length; i++) {
                        if ((selectedData[i].HSGrads / 100000) >= yMax) {
                            yMax = (selectedData[i].HSGrads / 100000);
                        }
                    }                
                    YdomainKeys = ([0, yMax]);
                    //  Create the chart and display the title and about data
                    createHSGradsChart(selectedData, XdomainKeys, YdomainKeys);
                    addChartTitle ("HSGrads2020-Descending");
                    addChartAbout ("HSGrads2020");
                });
            //      YEAR = 2021
            } else if (selectedYear == "2021") {
                d3.csv("./datasets/US_Census_Data/Education_Year_State_HSGrads_2021.csv", function (data) {
                    selectedData = data.map((d) => {
                        return {Year:d.Year, State:d.cd.slice(-2), HSGrads:d.high_school_or_some_degree};
                    });
                    selectedData.sort(function (a, b) { return a.HSGrads - b.HSGrads });
                    // Set Keys for Axes
                    XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                    yMax = 0;
                    for (var i=0; i<selectedData.length; i++) {
                        if ((selectedData[i].HSGrads / 100000) >= yMax) {
                            yMax = (selectedData[i].HSGrads / 100000);
                        }
                    }                
                    YdomainKeys = ([0, yMax]);
                    // Create the chart and display the title and about data
                    createHSGradsChart(selectedData, XdomainKeys, YdomainKeys);
                    addChartTitle ("HSGrads2021-Descending");
                    addChartAbout ("HSGrads2021");
                });
            }
        } else if (sort == "ascending") {
            //      YEAR = 2020
            if (selectedYear == "2020") {
                d3.csv("./datasets/US_Census_Data/Education_Year_State_HSGrads_2020.csv", function (data) {
                    selectedData = data.map((d) => {
                        return {Year:d.Year, State:d.cd.slice(-2), HSGrads:d.high_school_or_some_degree};
                    });
                    selectedData = selectedData.sort((a,b) => d3.descending(a.HSGrads, b.HSGrads));
                    // Set Keys for Axes
                    XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                    yMax = 0;
                    for (var i=0; i<selectedData.length; i++) {
                        if ((selectedData[i].HSGrads / 100000) >= yMax) {
                            yMax = (selectedData[i].HSGrads / 100000);
                        }
                    }                
                    YdomainKeys = ([0, yMax]);
                    //  Create the chart and display the title and about data
                    createHSGradsChart(selectedData, XdomainKeys, YdomainKeys);
                    addChartTitle ("HSGrads2020-Ascending");
                    addChartAbout ("HSGrads2020");
                });
            //      YEAR = 2021
            } else if (selectedYear == "2021") {
                d3.csv("./datasets/US_Census_Data/Education_Year_State_HSGrads_2021.csv", function (data) {
                    selectedData = data.map((d) => {
                        return {Year:d.Year, State:d.cd.slice(-2), HSGrads:d.high_school_or_some_degree};
                    });
                    selectedData = selectedData.sort((a,b) => d3.descending(a.HSGrads, b.HSGrads));
                    // Set Keys for Axes
                    XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                    yMax = 0;
                    for (var i=0; i<selectedData.length; i++) {
                        if ((selectedData[i].HSGrads / 100000) >= yMax) {
                            yMax = (selectedData[i].HSGrads / 100000);
                        }
                    }                
                    YdomainKeys = ([0, yMax]);
                    // Create the chart and display the title and about data
                    createHSGradsChart(selectedData, XdomainKeys, YdomainKeys);
                    addChartTitle ("HSGrads2021-Ascending");
                    addChartAbout ("HSGrads2021");
                });
            }
        } else if (sort == "random"){
            parseEducationCSV();
        }
    } else if (option == "noDegrees") {
        if (sort == "descending") {
            //      YEAR = 2020
            if (selectedYear == "2020") {
                d3.csv("./datasets/US_Census_Data/Education_Year_State_NoDegrees_2020.csv", function (data) {
                    selectedData = data.map((d) => {
                        return {Year:d.Year, State:d.cd.slice(-2), NoDegrees:d.Less_than_high_school_graduate};
                    });
                    selectedData.sort(function (a, b) { return a.NoDegrees - b.NoDegrees });
                    // Set Keys for Axes
                    XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                    yMax = 0;
                    for (var i=0; i<selectedData.length; i++) {
                        if ((selectedData[i].NoDegrees / 100000) >= yMax) {
                            yMax = (selectedData[i].NoDegrees / 100000);
                        }
                    }                
                    YdomainKeys = ([0, yMax]);
                    //  Create the chart and display the title and about data
                    createNoDegreesChart(selectedData, XdomainKeys, YdomainKeys);
                    addChartTitle ("noDegrees2020-Descending");
                    addChartAbout ("noDegrees2020");
                });
            //      YEAR = 2021
            } else if (selectedYear == "2021") {
                d3.csv("./datasets/US_Census_Data/Education_Year_State_NoDegrees_2021.csv", function (data) {
                    selectedData = data.map((d) => {
                        return {Year:d.Year, State:d.cd.slice(-2), NoDegrees:d.Less_than_high_school_graduate};
                    });
                    selectedData.sort(function (a, b) { return a.NoDegrees - b.NoDegrees });
                    // Set Keys for Axes
                    XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                    yMax = 0;
                    for (var i=0; i<selectedData.length; i++) {
                        if ((selectedData[i].NoDegrees / 100000) >= yMax) {
                            yMax = (selectedData[i].NoDegrees / 100000);
                        }
                    }                
                    YdomainKeys = ([0, yMax]);
                    // Create the chart and display the title and about data
                    createNoDegreesChart(selectedData, XdomainKeys, YdomainKeys);
                    addChartTitle ("noDegrees2021-Descending");
                    addChartAbout ("noDegrees2021");
                });
            }
        } else if (sort == "ascending") {
            //      YEAR = 2020
            if (selectedYear == "2020") {
                d3.csv("./datasets/US_Census_Data/Education_Year_State_NoDegrees_2020.csv", function (data) {
                    selectedData = data.map((d) => {
                        return {Year:d.Year, State:d.cd.slice(-2), NoDegrees:d.Less_than_high_school_graduate};
                    });
                    selectedData = selectedData.sort((a,b) => d3.descending(a.NoDegrees, b.NoDegrees));
                    // Set Keys for Axes
                    XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                    yMax = 0;
                    for (var i=0; i<selectedData.length; i++) {
                        if ((selectedData[i].NoDegrees / 100000) >= yMax) {
                            yMax = (selectedData[i].NoDegrees / 100000);
                        }
                    }                
                    YdomainKeys = ([0, yMax]);
                    //  Create the chart and display the title and about data
                    createNoDegreesChart(selectedData, XdomainKeys, YdomainKeys);
                    addChartTitle ("noDegrees2020-Ascending");
                    addChartAbout ("noDegrees2020");
                });
            //      YEAR = 2021
            } else if (selectedYear == "2021") {
                d3.csv("./datasets/US_Census_Data/Education_Year_State_NoDegrees_2021.csv", function (data) {
                    selectedData = data.map((d) => {
                        return {Year:d.Year, State:d.cd.slice(-2), NoDegrees:d.Less_than_high_school_graduate};
                    });
                    selectedData.sort(function (a, b) { return d3.ascending(a.HSGrads, b.HSGrads) });
                    // Set Keys for Axes
                    XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                    yMax = 0;
                    for (var i=0; i<selectedData.length; i++) {
                        if ((selectedData[i].NoDegrees / 100000) >= yMax) {
                            yMax = (selectedData[i].NoDegrees / 100000);
                        }
                    }                
                    YdomainKeys = ([0, yMax]);
                    // Create the chart and display the title and about data
                    createNoDegreesChart(selectedData, XdomainKeys, YdomainKeys);
                    addChartTitle ("noDegrees2021-Ascending");
                    addChartAbout ("noDegrees2021");
                });
            }
        } else if (sort == "random") {
            parseEducationCSV();
        }
    } else {
        alert("Please ensure all option fields are filled out appropriately!");
    }

}






/*                                      THIS IS THE CODE GRAVEYARD                                    */
/*            I simply didn't have the heart to delete it (plus some will be useful in V2) - Please Ignore                            */



/*
// Create Chart 2 allows for the axes to switch
function createChart2 (selectedData, XdomainKeys, YdomainKeys) {
    //                  SVG
    // Set the SVG parameters with height/width of #chartDisplay
    let display = document.getElementById("chartDisplay");
    display.innerHTML = "";
    margin = 60;
    SVGwidth = display.offsetWidth;
    width = SVGwidth - margin;
    SVGheight = display.offsetHeight;
    height = SVGheight - margin;
    // Append the SVG to the #chartDisplay div
    var svg = d3.select("#chartDisplay")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    //                  X-Axis
    let y = d3.scaleBand()
            .domain(YdomainKeys)
            .range([0, height - (margin*2)])
            .padding([0.5])
        svg.append("g")
            .attr("transform", "translate(" + margin + "," + margin + ")")
            .call(d3.axisLeft(y).tickSize(10));

    //                  Y-Axis
    let x = d3.scaleLinear()
        .domain(XdomainKeys)
        .range([0, width - (margin * 2)]);
    svg.append("g")
        .attr("transform", "translate(" + margin + "," + (height - margin) + ")")
        .call(d3.axisBottom(x));

    //                  Bars
    svg.selectAll("rect")
        .data(selectedData)
        .enter()
        .append("rect")
        .attr("x", x(0))         //function (d) { return x(d.State); })
        .attr("y", function (d) { return y(d.State); })    //function (d) { return (height - y(d.BorHigher / 100000)); })
        .attr("width", y.bandwidth())
        .attr("height", function (d) { return x(d.BorHigher / 100000); })
        .attr("fill", function (d) { return "rgb(0, 0, " + (d.BorHigher / 1000) + ")"})
        .attr("transform", "translate(" + margin + "," + (margin) + ")")
        .append("title");
}

// Create an SVG of the entire parent element's (#chartDisplay) size
function createSVG () {
    // Set the SVG parameters with height/width of #chartDisplay
    let display = document.getElementById("chartDisplay");
    margin = 60;
    SVGwidth = display.offsetWidth;
    width = SVGwidth - margin;
    SVGheight = display.offsetHeight;
    height = SVGheight - margin;
    // Append the SVG to the #chartDisplay div
    var svg = d3.select("#chartDisplay")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    return svg;
}

// Create an X-axis formatted on a set of keys in a defined SVG
function createXaxis (XdomainKeys, svg) {
    let x = d3.scaleBand()
            .domain(XdomainKeys)
            .range([0, width])
            .padding([0.5])
        svg.append("g")
            .attr("transform", "translate(" + margin + "," + (height - margin) + ")")
            .call(d3.axisBottom(x).tickSize(10));
    return x;
}

// Create a Y-axis formatted on a set of keys in a defined SVG 
function createYaxis (YdomainKeys, svg) {
    let y = d3.scaleLinear()
        .domain(YdomainKeys)
        .range([height - (2 * margin), 0]);
    svg.append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")")
        .call(d3.axisLeft(y));
    return y;
}

// Create the bars associated on the data
function createBars (selectedData, svg, Xaxis, Yaxis) {
    svg.selectAll("rect")
        .data(selectedData)
        .enter()
        .append("rect")
        .attr("x", function (d) { return (width - margin) / selectedData.length; })
        .attr("y", function (d) { return 20;})
        .attr("width", (SVGwidth / selectedData.length))
        .attr("height", function (d) { return (d.BorHigher / 10000); })
        .attr("fill", "blue");
}


 
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d, t) {        // Left Lower, Right Higher
            return t * ((SVGwidth + margin.left + margin.right)/(twentyTwentyEntries));
        })             
        .attr("y", function(d) {
            if (d.Year == "2020") {
                return (SVGheight - margin.bottom) - (d.BorHigher / 10000);
            }
        })             
        .attr("width", (SVGwidth - margin.left - margin.right) / (twentyTwentyEntries))          // Width of the Bar
        .attr("height", function(d) {       // Height of the Bar
            if (d.Year == "2020") {
                return (d.BorHigher / 10000);
            }
        })         
        .attr("fill", "blue")       // Color of the Bar

 
// Declare Global Variables which will be used to store loaded CSV files
var allData;
var selectedData;
var selectedYear;
// Declare width and height variables for SVG
var SVGwidth;
var SVGheight;
var margin = {top: 60, right: 10, bottom: 50, left: 50};
var barPadding = 1;
var rectWidth = 2;
var rectHeight = 75;


//          FUNCTIONS
// A database has been selected - Driver for _init_ functions
function datasetSelection (year) {
    selectedYear = year;
    if (selectedYear == "2020") {
        educationInit();
    } else if (selectedYear == "2021") {
        educationInit();
    } else {
        alert("An error has occurred! Please reload the page.");
    }
}


// Education _Init_ Function
function educationInit() {
    let container = document.getElementById("dynamicOptions");
    container.innerHTML = "";

    // Bar Graph Header
    let optHead = document.createElement("h4");
        optHead.setAttribute("id", "optHead");
    let center = document.createElement("center");
    let headTXT = document.createTextNode("Graph Options");
    let divider = document.createElement("div");
        divider.setAttribute("class", "divider");

    optHead.appendChild(center.appendChild(headTXT));
    container.appendChild(optHead);
    container.appendChild(divider);

    // X-Axis
    let Xselect = document.createElement("select");
        Xselect.setAttribute("id", "Xselect");        
        Xselect.setAttribute("name", "Xselect");

    let Xlabel = document.createElement("label");
        Xlabel.setAttribute("id", "Xlabel");
        Xlabel.setAttribute("for", "Xselect");
        let txt1 = document.createTextNode("X-Axis");
        Xlabel.appendChild(txt1);

    let Xopt0 = document.createElement("option");
        Xopt0.setAttribute("value", "");
        let txt0 = document.createTextNode("");
        Xopt0.appendChild(txt0);

    let Xopt1 = document.createElement("option");
        Xopt1.setAttribute("value", "state");
        let txt2 = document.createTextNode("State");
        Xopt1.appendChild(txt2);

    let Xopt2 = document.createElement("option");
        Xopt2.setAttribute("value", "education");
        let txt3 = document.createTextNode("Education");
        Xopt2.appendChild(txt3);

    // Y-Axis
    let Yselect = document.createElement("select");
        Yselect.setAttribute("id", "Yselect");        
        Yselect.setAttribute("name", "Yselect");

    let Ylabel = document.createElement("label");
        Ylabel.setAttribute("id", "Ylabel");
        Ylabel.setAttribute("for", "Yselect");
        let txt4 = document.createTextNode("Y-Axis");
        Ylabel.appendChild(txt4);

    let Yopt0 = document.createElement("option");
        Yopt0.setAttribute("value", "");
        let txt5 = document.createTextNode("");
        Yopt0.appendChild(txt5);

    let Yopt1 = document.createElement("option");
        Yopt1.setAttribute("value", "state");
        let txt6 = document.createTextNode("State");
        Yopt1.appendChild(txt6);

    let Yopt2 = document.createElement("option");
        Yopt2.setAttribute("value", "education");
        let txt7 = document.createTextNode("Education");
        Yopt2.appendChild(txt7);

    // Append all children to form and container
    let form = document.createElement("form");
        form.setAttribute("action", "javascript");
        form.setAttribute("onsubmit", "return parseEducationCSV();");

    let submit = document.createElement("input");
        submit.setAttribute("id", "submit");
        submit.setAttribute("type", "submit");
        submit.setAttribute("value", "Create Graph!");

    let br1 = document.createElement("br");
    let br2 = document.createElement("br");

    Xselect.appendChild(Xopt0);
    Xselect.appendChild(Xopt1);
    Xselect.appendChild(Xopt2);
    form.appendChild(Xlabel);
    form.appendChild(Xselect);
    form.appendChild(br1);
    Yselect.appendChild(Yopt0);
    Yselect.appendChild(Yopt1);
    Yselect.appendChild(Yopt2);
    form.appendChild(Ylabel);
    form.appendChild(Yselect);
    form.appendChild(br2);
    form.appendChild(submit);
    container.appendChild(form);
}

// Parse education.CSV
function parseEducationCSV () {
    d3.csv("./datasets/US_Census_Data/Education.csv", function (educationData) {
        
        // Store data in global var, store user's input in local vars
        allData = educationData;
        let Xselect = document.getElementById("Xselect");
            let Xaxis = Xselect.value;
        let Yselect = document.getElementById("Yselect");
            let Yaxis = Yselect.value;

        // Format the data into a better structure
        //let education = d.map((d) => {
        //    return {Year:d.Year, State:d.cd.slice(-2), BorHigher:d.Bachelors_degree_or_higher, HSorSD:d.high_school_or_some_degree, NoHS:d.Less_than_high_school_graduate};
        //})

        //          DRIVER
        if (Xaxis == "state" && Yaxis == "state") {
            svg = createSVG();


        } else if (Xaxis == "state" && Yaxis == "education") {
            // Assume the Year is 2020
            d3.csv("./datasets/US_Census_Data/Education_Year_State_BorHigher_2020.csv", function (data) {
                selectedData = data;
                var XdomainKeys = d3.map(selectedData, function (d) {return(d.State)}).keys();
                console.log(XdomainKeys);
                createXaxis(XdomainKeys, svg);
                


            });





            svg = createSVG();

        } else  if (Xaxis == "education" && Yaxis == "state") {
            svg = createSVG();

        } else if (Xaxis == "education" && Yaxis == "education") {
            svg = createSVG();

        } else {
            alert("Form submitted improperly. Please try again.");
        }
        });
    return false;
}


// Create an SVG of the entire parent element's (#chartDisplay) size
function createSVG () {
    // Set the SVG parameters with height/width of #chartDisplay
    let display = document.getElementById("chartDisplay");
    SVGwidth = display.offsetWidth;
    SVGheight = display.offsetHeight;
    // Append the SVG to the #chartDisplay div
    var svg = d3.select("#chartDisplay")
        .append("svg")
        .attr("width", SVGwidth)
        .attr("height", SVGheight);
    return svg;
}

function createXaxis (XdomainKeys, svg) {
    let x = d3.scaleBand()
            .domain(XdomainKeys)
            .range([0, SVGwidth - margin.left])
            .padding([0.1])
        svg.append("g")
            .attr("transform", "translate(40,150)") //+ (SVGheight - margin.bottom) + ")")
            .call(d3.axisBottom(x).tickSize(10));
}


// Handle the X-axis
function createBarGraph (data, Xparameter, Yparameter, svg) {
    if (Xparameter == "state" && Yparameter == "education") { 

        // Create various sets of data (such as Xdomain, yearCount) to be used in the rest of the function
        var XdomainKeys = d3.map(data, function (d) {return(d.State)}).keys();
        var yearCount = d3.rollup(data, (D) => D.length, (d) => d.Year);
            twentyTwentyEntries = yearCount.get("2020");
            console.log(twentyTwentyEntries);

        let  = d3.filter(data, (d) => d.State = "IN");
        console.log(test);

        // Create and Append the Xaxis
        let x = d3.scaleBand()
            .domain(XdomainKeys)
            .range([0, SVGwidth - margin.left])
            .padding([0.1])
        svg.append("g")
            .attr("transform", "translate(40," + (SVGheight - margin.bottom) + ")")
            .call(d3.axisBottom(x).tickSize(10));

        // Create and Append the Yaxis
        let y = d3.scaleLinear()
            .domain([0, 100])
            .range([SVGheight - margin.top, 0]);
        svg.append("g")
            .attr("transform", "translate( 40," + margin.right + ")")
            .call(d3.axisLeft(y));

        // Append Rects to the graph based on data
        // In this case, assume the year is 2020, Height is BorHigher, pos is State
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d, t) {        // Left Lower, Right Higher
                return t * ((SVGwidth + margin.left + margin.right)/(twentyTwentyEntries));
            })             
            .attr("y", function(d) {
                if (d.Year == "2020") {
                    return (SVGheight - margin.bottom) - (d.BorHigher / 10000);
                }
            })             
            .attr("width", (SVGwidth - margin.left - margin.right) / (twentyTwentyEntries))          // Width of the Bar
            .attr("height", function(d) {       // Height of the Bar
                if (d.Year == "2020") {
                    return (d.BorHigher / 10000);
                }
            })         
            .attr("fill", "blue")       // Color of the Bar
    }
}


*/
/*
    let XdomainKeys = d3.map(data, function (d) {
            if (d.State == "IN" || d.State == "IL") {
                return d.State;
            }
        }).keys();
    let index = XdomainKeys.indexOf("undefined");
        if (index > -1) {
            XdomainKeys.splice(index, 1);
        }
    console.log(XdomainKeys);

    // Create and Append the Xaxis
    let x = d3.scaleBand()
        .domain(XdomainKeys)
        .range([0, SVGwidth - margin.left])
        .padding([0.1])
    svg.append("g")
        .attr("transform", "translate(40," + (SVGheight - margin.bottom) + ")")
        .call(d3.axisBottom(x).tickSize(10));

    // Create and Append the Yaxis
    let y = d3.scaleLinear()
        .domain([0, 100])
        .range([SVGheight - margin.top, 0]);
    svg.append("g")
        .attr("transform", "translate( 40," + margin.right + ")")
        .call(d3.axisLeft(y));


    // Add data bars (Year = 2020)
    for (var i=0; i < data.length; i++) {
        svg.selectAll("rect")
        .data(newData)
        .enter()
        .append("rect")
        .attr("x", 10)
        .attr("y", 10)
        .attr("width", 10)
        .attr("height", function(d) {
            var barHeight = d.BorHigher / 10000;
            return barHeight + "px";
        })
        .attr("fill", "green");
    }
*/