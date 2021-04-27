
// function init() {
//     d3.json('samples.json').then(data => {
//         data = [{
//             x: data.metadata[0],
//             y: data.metadata[0],

//         }];
//         console.log(data)

//         let chart = d3.selectAll("#bar").node();
//         let chart2 = d3.selectAll("#bubble").node();

//         Plotly.newPlot(chart, data);
//         Plotly.newPlot(chart2, data);
//     })

// }

// Starter code from Terra(TA)
function optionChanged(userValue) {
    d3.json('samples.json').then(data => {
        createCharts(data, userValue)
    });
}

function createCharts(dataset, value) {
    console.log(dataset);
    console.log(value);

    // ____Create Charts Here!____(Terra)

    let id = dataset.metadata.id;
    let ethnicity = dataset.metadata.ethnicity;
    let gender = dataset.metadata.gender;
    let age = dataset.metadata.age;
    let location = dataset.metadata.location;
    let bbtype = dataset.metadata.bbtype;
    let wfreq = dataset.metadata.wfreqq;

    let value_otu = dataset.samples[0].sample_values.slice(0, 10).sort((a, b) => a - b);
    let label_otu = dataset.samples[0].otu_ids.map(d => `OTU ID ${d}`).slice(0, 10).sort((a, b) => a - b);
    let text_otu = dataset.samples[0].otu_labels.slice(0, 10).sort((a, b) => a - b);
    let color_otu = dataset.samples[0].otu_ids.slice(0, 10).sort((a, b) => a - b);

    // let len = data.metadata.length;

    // function buildTable(data, len) {
    //     let table = d3.select("#sample-metadata");
    //     let tbody = table.select("tbody");
    //     tbody.html("");

    // let trow;
    // for (let i = 0; i < len; i++) {
    //     trow = tbody.append("tr");
    //     // trow.append("td").text(data.metadata[i]);
    //     trow.append("td").text(data.metadata[i].name);
    //     trow.append("td").text(data.metadata[i].ethnicity);
    //     trow.append("td").text(data.metadata[i].gender);
    //     trow.append("td").text(data.metadata[i].age);
    //     trow.append("td").text(data.metadata[i].location);
    //     trow.append("td").text(data.metadata[i].bbtype);
    //     trow.append("td").text(data.metadata[i].wfreq);
    // }
    // }

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

// // This function is called when a dropdown menu item is selected
// function optionChanged() {
// //     // Use D3 to select the dropdown menu
//     let dropdownMenu = d3.select("#selDataset");
// //     // Assign the value of the dropdown menu option to a variable
//     let ids = dropdownMenu.property("value");

//     createCharts(ids);
// };

// Call testID() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", optionChanged);

// 


// // Add event listener for submit button
// d3.select("#selDataset").on("change", optionChanged);

// // // ________End of Terra's Code______
d3.json('samples.json').then(data => {
    console.log(data);
    createCharts(data, '940');
    // buildTable();
});

// init()

    // //     // Prevent the page from refreshing
    // //     // d3.event.preventDefault();

    // //     // Select input value from form
    // //     let id_value = d3.select("#selDataset").node().value;
    // //     console.log(id_value);

    // //     // Clear the input value
    // //     // d3.select("#selDataset").node().value = "";

    // //     // return userValue

    // //     // buildPlot(id_value);


    // // // From 3-5
    // // function getBacteriaData() {
    // //     d3.json('samples.json').then(function(data) {
    // //     // Grab values from the response json object to build the plots
    // //         let ids = data.metadata.id;
    // //         let ethnicity = data.metadata.ethnicity;
    // //         let gender = data.metadata.gender;
    // //         let age = data.metadata.age;
    // //         let location = data.metadata.location;
    // //         let bbtype = data.metadata.bbtype;
    // //         let wfreq = data.metadata.wfreqq;
    // //         let len = data.metadata.length;
    // //         buildTable(data, len);

    // //         // console.log(ids);
    // //         // console.log(data.dataset.data);


    // //     });
    // // }

    // // function buildTable(data, len) {
    // //     let table = d3.select("#sample-metadata");
    // //     let tbody = table.select("tbody");
    // //     tbody.html("");

    // //     let trow;
    // //     for (let i = 0; i < len ; i++) {
    // //         trow = tbody.append("tr");
    // //         // trow.append("td").text(data.metadata[i]);
    // //         trow.append("td").text(data.metadata[i].name);
    // //         trow.append("td").text(data.metadata[i].ethnicity);
    // //         trow.append("td").text(data.metadata[i].gender);
    // //         trow.append("td").text(data.metadata[i].age);
    // //         trow.append("td").text(data.metadata[i].location);
    // //         trow.append("td").text(data.metadata[i].bbtype);
    // //         trow.append("td").text(data.metadata[i].wfreq);
    // //     }
    // // }

    // // // function buildPlot(data, len) {
    // // function buildPlot() {
    // //     d3.json('samples.json').then(function(data) {
    // //         console.log(data)
    // //         let ids = data.metadata.id;
    // //         let ethnicity = data.metadata.ethnicity;
    // //         let gender = data.metadata.gender;
    // //         let age = data.metadata.age;
    // //         let location = data.metadata.location;
    // //         let bbtype = data.metadata.bbtype;
    // //         let wfreq = data.metadata.wfreqq; 

    // //         getBacteriaData();

