// /**
//  * Helper function to select stock data
//  * Returns an array of values
//  * @param {array} rows
//  * @param {integer} index
//  * index 0 - Names
//  * index 1 - Values
//  * index 2 - High
//  * index 3 - Low
//  * index 4 - Close
//  * index 5 - Volume
//  */

d3.json('samples.json').then( data => console.log(data) );


// From Terra: Build charts outside D3 loop:

//  function optionChanged(userValue) {
function submitHandler(userValue) {
    d3.json('samples.json').then(data => {
      buildPlot(data, userValue)
    //   createCharts(data, userValue)
    });
  }
//   function createCharts(dataset, value) {
//     console.log(dataset);
//     console.log(value);

    // Create Charts Here!
    function buildPlot() {
        d3.json('samples.json').then(function(data) {

    // From line 118
    // Grab values from the response json object to build the plots
    let name = Object.values(dataset.names);
    let samples = Object.values(dataset.samples);
    let otu_ids = Object.values(dataset.otu_ids);

    // let name = data.dataset.names;
    // let samples = data.dataset.sample_values;
    // let otu_ids = data.dataset.otu_ids;
    console.log(data);

    // Print the names of the columns
    console.log(data.dataset.column_names);

    let names = data.dataset.data.map(row => row[0]);
    console.log(names);


    // Print the data for each person
    console.log(data.dataset.data);
    let trace1 = {
        x: data.otu_ids,
        y: data.samples,
        type: "box",
        name: "Bacteria",
        boxpoints: "all"
    };

    let plotData = [trace1];

    let layout = {
        title: "Bacteria",
        xaxis: { title: "OTU ID"},
        yaxis: { title: "Bacteria"}
    };
    

  })


    // __________Rest of Terra's code:
  
  d3.json('samples.json').then(data => {
      createCharts(data, '940');
  });

 function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

//   ___________End of Terra's code_______________

//   Use pretty pring to make data more legible
  


// Attempt #1


// // Submit Button handler
// function handleSubmit(){
//     // Prevent page from refreshing
//     d3.event.prentDefault();

//     // Select input value from form
//     let name = d3.select("#selDataset").node.value;
//     console.log(name);

//     // Clear the input value
//     d3.select("#selDataset").node().value = "";
    
//     // Builtd plot with new name
//     buildPlot(name);
// }

// function buildPlot(name) {

//     d3.json('samples.json').then(data => {
//         console.log(data);

//         let names = unpack(data.dataset.data, 0);
//         let values = unpack(data.dataset.data, 1);
//         buildTable(names, values);
//     })
//   };


    
    // Atttempt #2

    function submitHandler(){
        // Prevent page from refreshing
        d3.event.prentDefault();

        // Select input value from form
        let name = d3.select("#selDataset").node.value;
        console.log(name);

        // Clear the input value
        d3.select("#selDataset").node().value = "";

        // Builtd plot with new name
        createCharts(name);
    }

    // // Grab values from the response json object to build the plots
    //     let name = Object.values(dataset.names);

    //     let name_sample = data.dataset.names;
    //     let samples = data.dataset.sample_values;
    //     let otu_ids = data.dataset.otu_ids;
    //     console.log(data);

    //     // Print the names of the columns
    //     console.log(data.dataset.column_names);

    //     let names = data.dataset.data.map(row => row[0]);
    //     console.log(names);
    

    //     // Print the data for each person
    //     console.log(data.dataset.data);
        

    // let trace1 = {
    //     x: data.otu_ids,
    //     y: data.samples,
    //     type: "box",
    //     name: "Bacteria",
    //     boxpoints: "all"
    // };

    // let plotData = [trace1];

    // let layout = {
    //     title: "Bacteria",
    //     xaxis: { title: "OTU ID"},
    //     yaxis: { title: "Bacteria"}
    // };

function init() {

    Plotly.newPlot("bar", plotData, layout);
}
    

// }.catch(error => console.log(error)

// }

// let plotData = (val) => updatePlotly(createCharts(val));
// let buildTrace = (val) => {
//     let dataset = [{
//         values: Object.values(data[val]),
//         labels: Object.keys(data[val]),
//         type: "pie"
//     }];
//     return dataset;
// }


Plotly.newPlot("bar", plotData, layout);
Plotly.newPlot("plot", createCharts('name'), {height: 600,width: 800});

// Add event listener for submit button
d3.select("#submit").on("click", submitHandler);

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);
    };
