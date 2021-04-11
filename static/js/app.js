/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Names
 * index 1 - Values
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */

 function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

//   Use pretty pring to make data more legible
  

// Submit Button handler
function handleSubmit(){
    // Prevent page from refreshing
    d3.event.prentDefault();

    // Select input value from form
    let name = d3.select("#selDataset").node.value;
    console.log(name);

    // Clear the input value
    d3.select("#selDataset").node().value = "";
    
    // Builtd plot with new name
    buildPlot(name);
}

// function buildPlot(name) {

    d3.json('samples.json').then(data => {
        console.log(data);

        let names = unpack(data.dataset.data, 0);
        let values = unpack(data.dataset.data, 1);
        // buildTable(names, values);
//   });


    
    

    // function submitHandler(){
        // Prevent page from refreshing
        // d3.event.prentDefault();

        // Select input value from form
        // let name = d3.select("#selDataset").node.value;
        // console.log(name);

        // Clear the input value
        // d3.select("#selDataset").node().value = "";

        // Builtd plot with new name
    //     buildPlot(name);
    // }

    // Grab values from the response json object to build the plots
        // let name = Object.values(data.name);

        // let name = data.dataset.name;
        // let samples = data.dataset.sample_values;
        // let otu_ids = data.dataset.otu_ids;
        // console.log(name);

        // Print the names of the columns
        // console.log(data.dataset.column_names);

        // let names = data.dataset.data.map(row => row[0]);
        // console.log(names);
    

        // Print the data for each person
        // console.log(data.dataset.data);
        

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

// function init() {

    Plotly.newPlot("bar", plotData, layout);

    // })

}).catch(error => console.log(error))

// }

// let getData = (val) => updatePlotly(buildTrace(val));
// let buildTrace = (val) => {
//     let dataset = [{
//         values: Object.values(data[val]),
//         labels: Object.keys(data[val]),
//         type: "pie"
//     }];
//     return dataset;
// }


// Plotly.newPlot("bar", plotData, layout);
// Plotly.newPlot("plot", buildTrace('name'), {height: 600,width: 800});

// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);
