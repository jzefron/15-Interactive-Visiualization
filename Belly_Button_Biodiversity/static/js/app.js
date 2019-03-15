function buildMetadata(sample) {
 
  // @TODO: Complete the following function that builds the metadata panel
  var html  = `metadata/${sample}`;
  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  d3.json(html).then(md => {

    var mSite = d3.select('#sample-metadata');
    // Use `.html("") to clear any existing metadata
    mSite.html('');
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    var mList = mSite.append('ul');
    Object.entries(md).forEach(k =>
       mList.append('li').text(`${k[0]}: ${k[1]}`)
    );
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  });
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var html  = `samples/${sample}`;
  console.log(html);
  var pieData;
  var bubData;
  var layout = {
    title: "Yummy bacteria"};
  d3.json(html).then( d=>{
    console.log(d['sample_values'])

    pieData = [{
      'labels':d['otu_ids'],
      'values':d['sample_values'].slice(0,10),
      'type':'pie',
      'text':d['otu_labels']
    } ];
    bubData = [{
      'x':d['otu_ids'],
      'y':d['sample_values'],
      'text':d['otu_labels'],
      'mode':'markers',
      'marker':{
        'color':d['otu_ids'],
        'size':d['sample_values']
      
      }
      
    }];
   
      // @TODO: Build a Bubble Chart using the sample data
      //  @TODO: Build a Pie Chart

      //apparently the react button can create and clear and make new plot wo deleting
    Plotly.react("pie",pieData,layout);
    Plotly.react("bubble",bubData,layout);

  });
 
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  console.log('init');
  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  
  buildCharts(newSample);
  buildMetadata(newSample);
 
}

// Initialize the dashboard
init();
