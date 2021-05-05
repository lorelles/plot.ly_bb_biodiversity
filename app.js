
// populate empty select element with dropdown list of subject's IDs
d3.json("samples.json").then(data => {
    let select = d3.select("#selDataset")
    data.names.forEach(id => {
        select.append("option")
            .text(id)
            .property("value", id)
    });
});

// let id = "940"
// function init() {
    // createCharts("940");
// }

//     d3.json("samples.json").then(data => {
//     const userValue = d3.select("#selDataset");

// });

//Function to get the new county when the user selects a new county
// function userValue() {
//     // d3.json('samples.json').then(data => {
//     let dropdownMenu = d3.select("#selDataset");
//     let dropID = dropdownMenu.property("value");

//     createCharts(dropID);
//     // });
// }

// function init() {
//     d3.json('samples.json').then(data => {
        
//         // const userValue = d3.select("#selDataset");
//         createCharts(data); 
//         console.log(data);
//         Plotly.newPlot("bar", data);
//     });
// };

// function optionChanged(userValue) {
//     d3.json('samples.json').then(data => {
//         // let userValue = d3.event.target.value

//         // const userValue = d3.select("#selDataset");
//         createCharts(data, userValue); 
//         console.log(userValue);
//         // buildPlot(data, userValue)
//     });
// }



// buildPlot();
function createCharts(id) {
    // d3.json('samples.json').then(data => {
    

    // Call in data, assign to variables
    d3.json('samples.json').then(function(data) {
        
    console.log(data);
    let name = data[0];
    // let id = data.metadata.id;
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
    
    console.log(name);
    // console.log(value_otu);
    // console.log(label_otu);
    // console.log(text_otu);
    // console.log(color_otu);

    // let select = d3.select("#selDataset")
    // data.names.forEach(id => {
    //     select.append("option")
    //         .text(id)
    //         .property("value", id)           
    // });

    // create table
    let table = d3.select("#sample-metadata");
    let tbody = table.select("tbody");  
    tbody.html("");
    
    let trow;
    // trow = tbody.append("tr");
    // data.names.forEach(id => {

    // for (let i = 0; i < 2; i++) {
        // data.names.forEach(id => {
        trow = tbody.append("tr");
        // trow.append("td").text(data.metadata[i]);
        trow.append("tr").text("id: ").append("td").text(id);

        // table.append("tr").text("id: ").append("td").text(data.metadata[i].id);
        // trow.append("tr").text(data.metadata[i].id);
        trow.append("tr").text("ethnicity: ").append("td").text(ethnicity);
        // trow.append("tr").text(data.metadata[i].ethnicity);
        trow.append("tr").text("gender: ").append("td").text(gender); 
        // trow.append("tr").text(data.metadata[i].gender);
        trow.append("tr").text("age: ").append("td").text(age);
        // trow.append("tr").text(data.metadata[i].age);
        trow.append("tr").text("location: ").append("td").text(location);
        // trow.append("tr").text(data.metadata[i].location);
        trow.append("tr").text("bbtype: ").append("td").text(bbtype);
        // trow.append("tr").text(data.metadata[i].bbtype);
        trow.append("tr").text("wfreq: ").append("td").text(wfreq);
        // trow.append("tr").text(data.metadata[i].wfreq);
    // };
    
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
        height: 500,
        width: 800
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
});
    
};

function optionChanged() {
        let select = d3.select("#selDataset");
        let testID = select.property("value");
        console.log(testID);
        createCharts(testID);
    }


// add event listener to select element
d3.selectAll("#selDataset").on("change", optionChanged);

// function buildPlot() {
//     let name = d3.event.target.value
//     let nameData = data.metadata.name.find(d => name == id)
//     init(nameData);
//     console.log(nameData)
// }

// init(data.metadata[0]);
// init();

// d3.json("samples.json").then(data => {
//     createCharts(data, "940");
// });


