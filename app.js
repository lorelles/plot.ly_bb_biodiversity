
// Initialize with default graph on page load:

function init() {
    d3.json('samples.json').then(data => {
    data = [{
        x: data.metadata[0],
        y: data.metadata[0],
        
    }];
    console.log(data)

    let chart = d3.selectAll("#bar").node();

    Plotly.newPlot(chart, data);
    })
}

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("body").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.node().value;

  let chart = d3.selectAll("#plot").node();

}

// Starter code from Terra(TA)
function optionChanged(userValue) {
    console.log(userValue);
    // Prevent the page from refreshing
    d3.event.preventDefault();

    d3.json('samples.json').then(data => {
        createCharts(data, userValue)
    });
}

function createCharts(data, value) {
    console.log(data);
    console.log(value);

    
    // ____Create Charts Here!____(Terra)

// From 3-5
function getBacteriaData() {
    d3.json('samples.json').then(function(data) {
    // Grab values from the response json object to build the plots
        let ids = (data.metadata.id);
        let ethnicity = (data.metadata.ethnicity);
        let gender = (data.metadata.gender);
        let age = (data.metadata.age);
        let location = (data.metadata.location);
        let bbtype = (data.metadata.bbtype);
        let wfreq = (data.metadata.wfreqq);
        let len = data.metadata.length;
        buildTable(data, len);
    });
}

function buildTable(data, len) {
    let table = d3.select("#sample-metadata");
    let tbody = table.select("tbody");
    tbody.html("");

    let trow;
    for (let i = 0; i < len ; i++) {
        trow = tbody.append("tr");
        // trow.append("td").text(data.metadata[i]);
        trow.append("td").text(data.metadata[i].name);
        trow.append("td").text(data.metadata[i].ethnicity);
        trow.append("td").text(data.metadata[i].gender);
        trow.append("td").text(data.metadata[i].age);
        trow.append("td").text(data.metadata[i].location);
        trow.append("td").text(data.metadata[i].bbtype);
        trow.append("td").text(data.metadata[i].wfreq);
    }
}

function buildPlot(data, len) {
    d3.json('samples.json').then(function(data) {
        console.log(data)
        let ids = data.metadata.id;
        let ethnicity = data.metadata.ethnicity;
        let gender = data.metadata.gender;
        let age = data.metadata.age;
        let location = data.metadata.location;
        let bbtype = data.metadata.bbtype;
        let wfreq = data.metadata.wfreqq; 
        
        getBacteriaData();

    // Set variables for charts
    let value_otu = data.samples[0].sample_values.slice(0,10).sort((a, b) => a-b),
    let label_otu = data.samples[0].otu_ids.map(d => `OTU ID ${d}`).slice(0,10).sort((a, b) => a-b),
    let text_otu = data.samples[0].otu_labels.slice(0,10).sort((a,b) => a-b),

    
        // Bar Chart

    // let layout = {
    //     // title: "Bacteria",
    //     // yaxis: { title: "OTU ID"},
    //     // xaxis: { title: "Bacteria"},
    //     margin: {
    //         l: 100,
    //         r: 100,
    //         t: 100,
    //         b: 100
    //       }      
    // };

    let trace1 = {
        type: 'bar',
        x: data.samples[0].sample_values.slice(0,10).sort((a, b) => a-b),
        y: data.samples[0].otu_ids.map(d => `OTU ID ${d}`).slice(0,10).sort((a, b) => a-b),
        text: data.samples[0].otu_labels.slice(0,10).sort((a,b) => a-b),
        orientation: 'h'
      };
      
    let plotData = [trace1]

    
    let chart = d3.selectAll("#bar").node;

    Plotly.newPlot("bar", plotData);

    // Bubble Chart



    })
}

buildPlot();    
    
};


// ________End of Terra's Code______
d3.json('samples.json').then(data => {
    console.log(data);
    createCharts(data, '940');
    // buildPlot();

    console.log(data.metadata[0])

});


d3.select("#selDataset").on("click", optionChanged);

init();
