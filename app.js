var tokml = require('tokml');
var fs = require('fs');

fs.readFile('coordinates.csv', (err, data) => {
  let coordinates = data
    .toString()
    .split('\n')
    .map((pair) => {
      let parts = pair.split(',');
      return {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [Number(parts[0]), Number(parts[1])]
        },
        "properties": {
          "namee": ""
        }
      };
    });

    let coordinateList = data
      .toString()
      .split('\n')
      .map((pair) => {
        let parts = pair.split(',');
        return [Number(parts[0]), Number(parts[1])];
      });

    let geojson = {};
    geojson.features = coordinates;
    geojson.type = "FeatureCollection";

    let kml = tokml(geojson);

    fs.writeFile('points.kml', kml, (err) => {
      if (!err) console.log("Wrote points.kml");
    });


    let lines = {
      type: "LineString",
      coordinates: coordinateList
    };

    let linesKml = tokml(lines);
    console.log(linesKml);
    fs.writeFile('lines.kml', linesKml, (err) => {
      if (!err) console.log("wrote lines.kml");
    });
});
