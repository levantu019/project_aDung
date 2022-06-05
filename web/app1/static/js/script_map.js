const bounds = [105.7596513, 21.0105679,
    105.8172094, 21.0833545];
    
var projection = "EPSG:4326"
const view = new ol.View({
    projection: projection,
    zoom: 0,
    extent: bounds,
})

const map = new ol.Map({
    layers: [],
    controls: [],
    target: 'map',
    view: view
})

const osm = new ol.layer.Tile({
    source: new ol.source.OSM(),
    zIndex: 1,
});

map.addLayer(osm);

map.getView().fit(bounds, map.getSize());

var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(3),
    projection: projection,
    className: 'mouse-position',
    target: document.getElementById('position_mouse'),
    undefinedHTML: '&nbsp;',
})

map.addControl(mousePositionControl);


// Current position
const positionFeature = new ol.Feature();
positionFeature.setStyle(
  new ol.style.Style({
    image: new ol.style.Circle({
      radius: 6,
      fill: new ol.style.Fill({
        color: '#3399CC',
      }),
      stroke: new ol.style.Stroke({
        color: '#fff',
        width: 2,
      }),
    }),
  })
);