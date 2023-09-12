import axios from 'axios';
const Papa = require('papaparse');


const token = "JxjGWE-KPUyzNY-b2WBYbFPy42M5-L_kPbjaD6ID5k16eyCIpfkpx0uO3avjT0DWvy31b-fd-7oZwdVuRctg9A==";

function createLatestQuery(markerData) {
    const siteNames = markerData.map(item => item.site_name);
    const siteNamesQueryString = siteNames.map(siteName => `r.site_name == "${siteName}"`).join(" or ");

    var query = `from(bucket: "prod")
    |> range(start: -1d)
    |> filter(fn: (r) => r._measurement == "maxbotix_depth")
    |> filter(fn: (r) => ${siteNamesQueryString})
    |> keep(columns: ["_value","site_code","site_name","_time"])
    |> sort(columns: ["_time"])
    |> last()`;
    
    return query;
}


export async function fetchDataFromInflux(markerData, region, organization) {
    const query = createLatestQuery(markerData);
    //console.log(query)
    const url = `https://${region}.aws.cloud2.influxdata.com/api/v2/query?org=${organization}&` +
    `q=${encodeURIComponent(query)}`;
    try {
    const response = await axios.post(url, query, {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/vnd.flux',
            'Authorization': `Token ${token}`
        },
    });
    //console.log(typeof(response.data))

    const responseData = Papa.parse(response.data, {
        header: true, // Use the first row as headers
        complete: function (results) {
          // Filter out empty entries
          const filteredData = results.data.filter((entry) => {
            // Filter out entries with all fields empty or undefined
            return Object.values(entry).some((value) => value !== undefined && value.trim() !== '');
          });
      
          //console.log(filteredData);
        },
        error: function (error) {
          console.error('parsing error:', error.message);
        },
      });
        //console.log(responseData)
        //console.log(markerData)
    
        // use the response data to update the markerData array
        const updatedMarkerData = markerData.map((marker) => {
            const matchingResponseData = responseData.data.find((response) => response.site_name === marker.site_name);
          
            if (matchingResponseData) {
              return {
                ...marker,
                value: matchingResponseData._value,
              };
            }
          
            // If there's no matching responseData, keep the marker unchanged
            return marker;
          });
          
          //console.log(updatedMarkerData);
    
    return updatedMarkerData; // Assuming the response data is an array of marker objects
    } catch (error) {
    console.error('Error fetching data from InfluxDB:', error);
    throw error;
    }
}
  