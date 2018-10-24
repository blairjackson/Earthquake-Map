var mapImg;

var clat = 0;
var clon = 0;

var zoom = 1;
var earthquakes;

function preload() {


    // https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson
    //load image from mapbox
    mapImg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0/1024x512?access_token=pk.eyJ1IjoiYmxhaXJnamFja3NvbiIsImEiOiJjam5seHp0OGYxNnExM3dzNTRoOXUxenNjIn0.YcsstIySN2fkjJiibxSkFw");

    //load json of earthquake info
    earthquakes = loadJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson");


}

//find x position from coordinates and plot on 2d map
function mercX(lon) {
    lon = radians(lon);
    var a = (256 / PI) * pow(2, zoom);
    var b = lon + PI;
    return a * b;
}

//find y position from coordinates and plot on 2d map
function mercY(lat) {
    lat = radians(lat);
    var a = (256 / PI) * pow(2, zoom);
    var b = tan(PI / 4 + lat / 2);
    var c = PI - log(b);

    return a * c;
}

function setup() {
    createCanvas(1024, 512);
    translate(width / 2, height / 2);
    imageMode(CENTER);
    image(mapImg, 0, 0);

    var cx = mercX(clon);
    var cy = mercY(clat);

    for (var i = 0; i < earthquakes.features.length; ++i) {

        //get magnitude and multiply to make ellipse bigger for larger earthquakes
        var earthquakeMag = (earthquakes.features[i].properties.mag);

        earthquakeMag = pow(10, earthquakeMag);
        earthquakeMag = sqrt(earthquakeMag);

        var magMax = sqrt(pow(10, 10));
        var d = map(earthquakeMag, 0, magMax, 0, 250);


        //get coordinates of earthquake 
        var earthquakePosX = earthquakes.features[i].geometry.coordinates[0];
        var earthquakePosY = earthquakes.features[i].geometry.coordinates[1];

        //find x and y on map 
        var x = mercX(earthquakePosX) - cx;
        var y = mercY(earthquakePosY) - cy;

        //draw on map
        stroke(255, 0, 255);
        fill(255, 0, 255, 200);
        ellipse(x, y, d, d);
    }

}