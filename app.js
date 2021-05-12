
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
    buildPlot("940");
});
};

function optionChanged(userValue) {
    createCharts(userValue);
    buildPlot(userValue);
    console.log(userValue);
};

// create table
function buildPlot(sample) {
    // call in data, assign to variables
    d3.json('samples.json').then(function(data) {
// filter data for object (Plotlyjs.com)
let metaData = data.metadata;
let filterData = metaData.filter(sampleObj => sampleObj.id == sample);
let meta = filterData[0];
let wfreq = meta.wfreq;
// let minWfreq = d3.min(data.metadata.map(sample => sample.wfreq.min))
// let maxWfreq = d3.max(metaData.map(sample => sample.wfreq.max))
   
// build table
let table = d3.select("#sample-metadata");
table.html("");

// console.log(minWfreq);
// console.log(maxWfreq);
console.log(meta.wfreq);

    // Guage Chart
    let trace3 = {
        domain: { x: [0, 1],
        y: [0, 1] },
        value: wfreq,
        title: { text: "Belly Button Washing Frequency" + '<br>' + '<span style="font-size: 14px;">Scrubs per Week</span>'},

        type: 'indicator',
        mode: 'gauge+number',
        // delta: {reference: data.metadata.wfreq.max },
        // guage: { axis: { range: [minWfreq, maxWfreq] } ,
        //     threshold: { line: { color: "red", width: 4 },
        //     thickness: 0.75, vaulue: data.metadata.wfreq.max}}
        }       

    let plotData3 = [trace3];

    let layout3 = {
        height: 500,
        width: 800,
        margin: { t: 0, b: 0 }, 
        automargin: true
    };

    Plotly.newPlot("gauge", plotData3, layout3);
    // });
    // Filter sample objects (Plotlyjs.com)
Object.entries(meta).forEach(([key, value]) => {
    table.append("h5").text(`${key}: ${value}`);
});
});
};

function createCharts(sample) {
    // d3.json('samples.json').then(data => {
    
    // Call in data, assign to variables
    d3.json('samples.json').then(function(data) {      

    let samples = data.samples;
    let filterSample = samples.filter(sampleObj => sampleObj.id == sample);
    let sampleData = filterSample[0];
    console.log(sampleData);

    // let value_otu = data.samples[0].sample_values.slice(0, 10).sort((a, b) => a - b);
    // let text_otu = data.samples[0].otu_labels.slice(0, 10).sort((a, b) => a - b);
    
    let sample_value = sampleData.sample_values;
    let sort_sample_value = sample_value.slice(0, 10).sort((a, b) => a - b);
    let otu_label = sampleData.otu_labels;
    let sort_label_otu = sampleData.otu_labels.map(d => `OTU ID ${d}`).slice(0,10).sort((a, b) => a-b);
    let otu_id = sampleData.otu_ids;
    let sort_otu_id = data.samples[0].otu_ids.map(d => `OTU ID ${d}`).slice(0,10).sort((a, b) => a-b);
    
    // let sort_otu_id = sampleData.otu_ids.slice(0, 10).sort((a, b) => a - b);

    
    
    // .slice(0, 10).sort((a, b) => a - b);
    // let color_otu_id = data.samples[0].otu_ids.slice(0, 10).sort((a, b) => a - b);

    // let try_value_otu = data.samples[0].sample_values.slice(0,10).sort((a, b) => a-b);
    // let try_label_otu = data.samples[0].otu_ids.map(d => `OTU ID ${d}`).slice(0,10).sort((a, b) => a-b);
    // let try_text_otu = data.samples[0].otu_labels.slice(0,10).sort((a,b) => a-b);
    // let try_color_otu = data.samples[0].otu_ids.slice(0,10).sort((a,b) => a-b);
    
    // console.log(minWfreq);
    // console.log(maxWfreq);
    // console.log(try_color_otu);

    // console.log(sort_value_otu);
    // console.log(value_otu); 
    // console.log(label_otu_id);
    // console.log(label_otu);
    // console.log(color_otu_id);

    // Bar Chart
    let trace1 = {
        type: 'bar',
        x: sort_sample_value,
        y: sort_otu_id,
        text: sort_label_otu,
        orientation: 'h'
    };

    let plotData = [trace1];

    let layout = {
        height: 500,
        width: 500,
        automargin: true
    }

    Plotly.newPlot("bar", plotData, layout);

    // Bubble Chart
    let trace2 = {
        x: otu_id,
        y: sample_value,
        text: otu_label,
        mode: 'markers',
        marker: {
            color: otu_id,
            size:sample_value,
            opacity: [.8]
        },
        type: 'scatter'
    };

    let plotData2 = [trace2];

    let layout2 = {
        xaxis: {
            title: 'OTU ID',
            titlefont: {
                family: 'Arial, sans-serif',
                size: 18,
                color: 'black'
              }
            },
        showlegend: false,
        height: 500,
        width: 800,
        automargin: true
    };

    Plotly.newPlot("bubble", plotData2, layout2);

//     // Guage Chart
//     let trace3 = {
//         domain: { x: [0, 1],
//         y: [0, 1] },
//         value: wfreq,
//         title: { text: "Scrubs per Week" },
//         type: 'indicator',
//         mode: 'gauge+number+delta',
//         delta: {reference: sampleData.wfreq.max },
//         guage: { axis: { range: [minWfreq, maxWfreq] } ,
//             threshold: { line: { color: "red", width: 4 },
//             thickness: 0.75, vaulue: sampleData.wfreq.max}}
//         }       

//     let plotData3 = [trace3];

//     let layout3 = {
//         height: 500,
//         width: 800,
//         margin: { t: 0, b: 0 } 
//         // automargin: true
//     };

//     Plotly.newPlot("guage", plotData3, layout3);
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


