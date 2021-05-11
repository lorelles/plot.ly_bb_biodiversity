
// populate empty select element with dropdown list of subject's IDs
function init() {
let select = d3.select("#selDataset");
d3.json("samples.json").then(data => {
    
    let nameSample = data.names;
    nameSample.forEach(sample => {
        select.append("option")
            .text(sample)
            .property("value", sample)
    });
    createCharts("940");
    // buildPlot("940");
});
};

function optionChanged(userValue) {
    createCharts(userValue);
    // buildPlot(userValue);
    console.log(userValue);
};

// create table
function createCharts(sample) {
    // call in data, assign to variables
    d3.json('samples.json').then(function(data) {
// filter data for object (Plotlyjs.com)
let metaData = data.metadata;
let filterData = metaData.filter(sampleObj => sampleObj.id == sample);
let meta = filterData[0];
// build table
let table = d3.select("#sample-metadata");
table.html("");

// Filter sample objects (Plotlyjs.com)
Object.entries(meta).forEach(([key, value]) => {
    table.append("h5").text(`${key}: ${value}`);
});

// function createCharts(sample) {
    // d3.json('samples.json').then(data => {
    
    // Call in data, assign to variables
    // d3.json('samples.json').then(function(data) {      

    let sample_ids = data.samples;
    let filterSampleIds = sample_ids.filter(sampleObj => sampleObj.id == sample);
    let sampleData = filterSampleIds[0];
    console.log(sample_ids);

    // let value_otu = data.samples[0].sample_values.slice(0, 10).sort((a, b) => a - b);
    // let text_otu = data.samples[0].otu_labels.slice(0, 10).sort((a, b) => a - b);
    
    let value_otu = sampleData.sample_values;
    let sort_value_otu = value_otu.slice(0, 10).sort((a, b) => a - b);
    let label_otu = sampleData.otu_labels;
    let label_otu_id = data.samples[0].otu_ids.map(d => `OTU ID ${d}`).slice(0, 10).sort((a, b) => a - b);
    // let color_otu = sampleData.otu_ids;
    let color_otu = sampleData.otu_ids;
    // .slice(0, 10).sort((a, b) => a - b);
    let color_otu_id = data.samples[0].otu_ids.slice(0, 10).sort((a, b) => a - b);

    let try_value_otu = data.samples[0].sample_values.slice(0,10).sort((a, b) => a-b);
    let try_label_otu = data.samples[0].otu_ids.map(d => `OTU ID ${d}`).slice(0,10).sort((a, b) => a-b);
    let try_text_otu = data.samples[0].otu_labels.slice(0,10).sort((a,b) => a-b);
    let try_color_otu = data.samples[0].otu_ids.slice(0,10).sort((a,b) => a-b);
    console.log(try_value_otu);
    console.log(try_label_otu);
    console.log(try_text_otu);
    console.log(try_color_otu);

    console.log(sort_value_otu);
    console.log(value_otu); 
    console.log(label_otu_id);
    console.log(label_otu);
    console.log(color_otu_id);

    // Bar Chart
    let trace1 = {
        type: 'bar',
        x: try_value_otu,
        y: try_label_otu,
        text: label_otu_id,
        orientation: 'h'
    };

    let plotData = [trace1];

    let layout = {
        height: 500,
        width: 800
    }

    Plotly.newPlot("bar", plotData, layout);

    // Bubble Chart
    let trace2 = {
        x: try_color_otu,
        y: value_otu,
        text: label_otu,
        mode: 'markers',
        marker: {
            color: [color_otu],
            size: [sort_value_otu],
            // color: ['rgb(44, 160, 101)'],
            size: [40],
            opacity: [.8]
        },
        // type: 'scatter'
    };

    let plotData2 = [trace2];

    let layout2 = {
        title: 'OTU ID',
        showlegend: false,
        height: 500,
        width: 800
    };

    Plotly.newPlot("bubble", plotData2, layout2);
});
    
};
// });
// };
// function optionChanged(userValue) {
//         // let select = d3.select("#selDataset");
//         // let testID = select.property("value");
//         // console.log(testID);
//         createCharts(userValue);
//         buildPlot(userValue);
//     }


// // add event listener to select element
// d3.selectAll("#selDataset").on("change", optionChanged);

// function buildPlot() {
//     let name = d3.event.target.value
//     let nameData = data.metadata.name.find(d => name == id)
//     init(nameData);
//     console.log(nameData)
// }

// init(data.metadata[0]);
init();

// d3.json("samples.json").then(data => {
//     createCharts(data, "940");
//     buildPlot(data, "940");
// });


