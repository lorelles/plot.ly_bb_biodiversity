
// populate empty select element with dropdown list of subject's IDs
d3.json("samples.json").then(data => {
    let select = d3.select("#selDataset")
    data.names.forEach(id => {
        select.append("option")
            .text(id)
            .attr("value", id)
    });
});


function optionChanged(userValue) {
    d3.json('samples.json').then(data => {
        console.log(userValue)
        createCharts(data, userValue)
    });
}

// buildPlot();
function createCharts(data) {

    // Call in data, assign to variables
    // d3.json('samples.json').then(function(data) {

    let id = data.names;
    let ethnicity = data.metadata[0].ethnicity;
    let gender = data.metadata[0].gender;
    let age = data.metadata[0].age;
    let location = data.metadata[0].location;
    let bbtype = data.metadata[0].bbtype;
    let wfreq = data.metadata[0].wfreq;
    let len = data.names.length;

    let value_otu = data.samples[0].sample_values.slice(0, 10).sort((a, b) => a - b);
    let label_otu = data.samples[0].otu_ids.map(d => `OTU ID ${d}`).slice(0, 10).sort((a, b) => a - b);
    let text_otu = data.samples[0].otu_labels.slice(0, 10).sort((a, b) => a - b);
    let color_otu = data.samples[0].otu_ids.slice(0, 10).sort((a, b) => a - b);
    
    // create table
    let table = d3.select("#sample-metadata");
    let tbody = table.select("tbody");
    // let id = data.names[0]
    
    tbody.html("");
    let trow;
    for (let i = 0; i < 5; i++) {
        // data.metadata[0].id.forEach(id => {
        trow = tbody.append("tr");
        // trow.append("td").text(dataset.metadata[i]);
        trow.append("tr").text(data.metadata[i].id);
        trow.append("tr").text(data.metadata[i].ethnicity);
        trow.append("tr").text(data.metadata[i].gender);
        trow.append("tr").text(data.metadata[i].age);
        trow.append("tr").text(data.metadata[i].location);
        trow.append("tr").text(data.metadata[i].bbtype);
        trow.append("tr").text(data.metadata[i].wfreq);
    };
    // });

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

    Plotly.newPlot("bubble", plotData2, layout2);

};

// add event listener to select element
d3.selectAll("#selDataset").on("change", optionChanged);

// function buildPlot() {
//     let name = d3.event.target.value
//     let nameData = data.metadata.name.find(d => name == id)
//     init(nameData);
// }
// init(data.metadata[0]);

d3.json("samples.json").then(data => {
    createCharts(data, "940");
});
