// Set ID 940 at page load
// let testID = "940"

// Call createCharts
// createCharts(testID);


// make call and process return
// d3.json("samples.json").then(data => {
//     console.log(data.names);
//     console.log(data.metadata[0].id);
     
    // // populate empty select element with dropdown list of subject's IDs
    // let select = d3.select("#selDataset")
    // // data.metadata[0].forEach(id => {
    // let len = data.metadata.length;   
    // for (let i = 0; i < len; i++) {
    //     let id = data.names[i]
    //     select.append("option")
    //     .text(id)
    //     .attr("value", id)
    //     // .property("value", 940)
    // }
    // });


function optionChanged(userValue) {
    d3.json('samples.json').then(data => {
      createCharts(data, userValue)
    });
  }

function createCharts(data) {
    
    // Call in data, assign to variables
    // d3.json('samples.json').then(function(data) {
    let id = data.metadata.id;
    let ethnicity = data.metadata.ethnicity;
    let gender = data.metadata.gender;
    let age = data.metadata.age;
    let location = data.metadata.location;
    let bbtype = data.metadata.bbtype;
    let wfreq = data.metadata.wfreqq;
    let len = data.metadata.length;   
 
    let value_otu = data.samples[0].sample_values.slice(0, 10).sort((a, b) => a - b);
    let label_otu = data.samples[0].otu_ids.map(d => `OTU ID ${d}`).slice(0, 10).sort((a, b) => a - b);
    let text_otu = data.samples[0].otu_labels.slice(0, 10).sort((a, b) => a - b);
    let color_otu = data.samples[0].otu_ids.slice(0, 10).sort((a, b) => a - b);

    // populate empty select element with dropdown list of subject's IDs
    let select = d3.select("#selDataset")
    // data.metadata[0].forEach(id => {
    // let len = data.metadata.length;   
    for (let i = 0; i < len; i++) {
        let id = data.names[i]
        select.append("option")
        .text(id)
        .attr("value", id)
        // .property("value", 940)
    }



    // Bar Chart
    let trace1 = {
        type: 'bar',
        x: value_otu,
        y: label_otu,
        text: text_otu,
        orientation: 'h'
    };

    let plotData = [trace1];

    let layout = {
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    }

    Plotly.newPlot("bar", plotData, layout);

    // Bubble Chart
    let trace2 = {
        x: label_otu,
        y: value_otu,
        text: [text_otu],
        mode: 'markers',
        marker: {
            color: [color_otu],
            // size: [value_otu],
            // color: ['rgb(44, 160, 101)'],
            size: [40],
            opacity: [.8]
        },
        type: 'scatter'
    };

    let plotData2 = [trace2];

    let layout2 = {
        title: 'OTU ID',
        showlegend: false,
        height: 500,
        width: 800
    };

    console.log(value_otu);

    Plotly.newPlot("bubble", plotData2, layout2);

    
};
    
// function subjID() {
//     let dropdownMenu = d3.select("#selDataset");
//     let ids = dropdownMenu.property("value");

//     createPlots(ids);
// }

// add event listener to select element
d3.selectAll("#selDataset").on("change", createCharts);



d3.json("samples.json").then(data => {
    createCharts(data, "940");
});
