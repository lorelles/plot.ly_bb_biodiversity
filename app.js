// initaliz page load and populate empty select element with dropdown list of subject sample ids, starting with first id
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

// create function to change value
function optionChanged(userValue) {
    createCharts(userValue);
    buildPlot(userValue);
};

// create demo table and gauge chart
function buildPlot(sample) {
    // call in data, assign to variables
    d3.json('samples.json').then(function (data) {
        // filter data for object 
        let metaData = data.metadata;
        let filterData = metaData.filter(sampleObj => sampleObj.id == sample);
        let meta = filterData[0];
        let wfreq = meta.wfreq;

        // build demo table
        let table = d3.select("#sample-metadata");
        table.html("");

        // build gauge chart
        let trace3 = {
            domain: {
                x: [0, 1],
                y: [0, 1]
            },
            value: wfreq,
            title: { text: "Belly Button Washing Frequency" + '<br>' + '<span style="font-size: 14px;">Scrubs per Week</span>' },
            type: 'indicator',
            mode: 'gauge+number',
        }

        let plotData3 = [trace3];

        let layout3 = {
            height: 500,
            width: 500,
            margin: { t: 0, b: 0, l: 1 },
        };

        Plotly.newPlot("gauge", plotData3, layout3);

        // Filter sample objects (Plotly.com)
        Object.entries(meta).forEach(([key, value]) => {
            table.append("h5").text(`${key}: ${value}`);
        });
    });
};

// create bar and bubble charts
function createCharts(sample) {

    // call in data, assign to variables
    d3.json('samples.json').then(function (data) {

        let samples = data.samples;
        let filterSample = samples.filter(sampleObj => sampleObj.id == sample);
        let sampleData = filterSample[0];
        let sample_value = sampleData.sample_values;
        let sort_sample_value = sample_value.slice(0, 10).sort((a, b) => a - b);
        let otu_label = sampleData.otu_labels;
        let sort_label_otu = sampleData.otu_labels.map(d => `OTU ID ${d}`).slice(0, 10).sort((a, b) => a - b);
        let otu_id = sampleData.otu_ids;
        let sort_otu_id = data.samples[0].otu_ids.map(d => `OTU ID ${d}`).slice(0, 10).sort((a, b) => a - b);

        // bar chart
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
            margin: { t: 0, b: -1, l: -5 },
        }

        Plotly.newPlot("bar", plotData, layout);

        // bubble Chart
        let trace2 = {
            x: otu_id,
            y: sample_value,
            text: otu_label,
            mode: 'markers',
            marker: {
                color: otu_id,
                size: sample_value,
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
            height: 400,
            width: 900,
            margin: { t: 0, b: -1 },
            automargin: true
        };

        Plotly.newPlot("bubble", plotData2, layout2);
    });
};

init();