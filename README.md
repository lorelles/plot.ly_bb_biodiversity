# plot.ly_bb_biodiversity

<img width="1117" alt="plotly bio" src="https://user-images.githubusercontent.com/74384017/118028514-020e2300-b318-11eb-81de-944b013b3a87.png">

This project uses D3 and JavaScript to create an interactive dashboard that explores the Belly Button Biodiversity dataset (Within file labled "samples.json") which catalogs the microbes that colonize human navels. The dataset reveals that a few microbrial species, referred to as OTUs (Operational taxonomic units), were present in over 70% of people, while the rest were more rare.

To view data pertaining to each subject, click on the ID number in the dropdown menu. This will reveal the demobraphic information in a table, top 10 OTUs in a bar chart, weekly washing frequency in a gauge chart, and sample values in a bubble chart. The size of the marker is determined by the value of the OTU, while the color is set based on the ID of the OTU. When you hover over the bar and bubble chart plots you will see the information about each OTU.