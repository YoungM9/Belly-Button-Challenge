function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1: 1. Create the buildChart function.
function buildCharts(sample) {
  // Deliverable 1: 2. Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Deliverable 1: 3. Create a variable that holds the samples array. 
var sample = data.sample;
    // Deliverable 1: 4. Create a variable that filters the samples for the object with the desired sample number.
var samArr = sample.filter(sampleObj.id == sample);
    // Deliverable 3: 1. Create a variable that filters the metadata array for the object with the desired sample number.
var medata = data.medata
var metArr = metadata.filter(sampleObj => sampleObj.id == sample);
    // Deliverable 1: 5. Create a variable that holds the first sample in the array.
var1 = sampleArray[0];
    // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.
met1 = metaArray[0];
    // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
var otu_id = result.otu_id;
var otu_label = result.otu_label;
var samp_val = result.samp_val;
console.log(otu_id)
console.log(samp_val)
console.log(out_label)
    // Deliverable 3: 3. Create a variable that holds the washing frequency.
var wash = parseFloat(result.wfreq)
console.log(wash)
    // Deliverable 1: 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    var yticks =  otu_id.slice(0,6).map(id > 'OTU ${id}').reverse();

    // Deliverable 1: 8. Create the trace for the bar chart. 
    var barData = [ {
      x: samp_val.slice(0,6).reverse(),
  y: yticks,
  text: otu_label.slice(0,6).reverse(),
  type: 'bar',
  orientation: 'h'

    }
  
    ];

    // Deliverable 1: 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Bacteria Species",
      xaxis: {title: "Sample Values"},
      yaxis: {title: "ID's"}

    };

    // Deliverable 1: 10. Use Plotly to plot the data with the layout. 
    Plotly.newplot("bar, barData, barLayout");
    // Deliverable 2: 1. Create the trace for the bubble chart.
    var bubble = [{
      x: otu_id.slice(0,8).reverse(),
      y: samp_val.slice(0,8).reverse(),
      text: otu_label.slice(0,6).reverse(),
      mode: 'markers',
      marker: {
        size: samp_val.slice(0,8).reverse(),
        color: otu_id.slice(0,6).reverse(),
        colorscale: 'Earth'
      }
    }]
    // Deliverable 2: 2. Create the layout for the bubble chart.
    var bubblelay = {
      title: "Top Bacteria",
      xaxis: {title: "Value"},
      yaxis: {title: "ID's"}
    };
    // Deliverable 2: 3. Use Plotly to plot the data with the layout.
    PLotly.newPLot("bubbleplot",bubble,bubblelay)
    // Deliverable 3: 4. Create the trace for the gauge chart.
    
    var data_guage = [
          {
          domain: { x: [0, 1], y: [0, 1] },
          value: parseFloat(wfreq),
          title: { text: `Weekly Washing Frequency ` },
          type: "indicator",
          
          mode: "gauge+number",
          gauge: { axis: { range: [null, 9] },
                   steps: [
                    { range: [0, 2], color: "yellow" },
                    { range: [2, 4], color: "blue" },
                    { range: [4, 6], color: "green" },
                    { range: [6, 8], color: "red" },
                    { range: [8, 9], color: "orange" },
                  ]}
    // Deliverable 3: 5. Create the layout for the gauge chart.
  var layout_guage = { 
            width: 900, 
            height: 700, 
            margin: { t: 20, b: 40, l:100, r:100 } 
          };
    // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.
          Plotly.newPlot("gauge", data_guage, layout_guage);
  });
}
