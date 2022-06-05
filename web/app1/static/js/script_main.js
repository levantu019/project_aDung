const url_base = "http://localhost:8989/route?";

// Nếu có đầy đủ điểm đầu và điểm cuối thì tự động run
function CheckInput(){
    var start = $(".location-start").val();
    var end = $(".location-end").val();

    if(start != "" && end != "") return true;
    return false;
}

// Tạo GeoJSON từ dữ liệu server gửi về
function createGeoJSON(geom){
    var geojsonObject = {
      'type': 'FeatureCollection',
      'crs': {
        'type': 'name',
        'properties': {
          'name': 'EPSG:32648',
        },
      },
      'features': [{
          'type': 'Feature',
          'geometry': ''
      }]
    };
    geojsonObject['features'][0]['geometry'] = geom;

    return geojsonObject;
}

// Nhận dữ liệu và in kết quả đường tìm thấy
var vectorLayer;
function showResultWay(data){
    var way = createGeoJSON(data);
    console.log(way);
    const styles = {
        'MultiLineString': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'rgb(0, 0, 255)',
                width: 5,
            })
        }),
    };
    const vectorSource = new ol.source.Vector({
        features: new ol.format.GeoJSON().readFeatures(way),
    });

    map.removeLayer(vectorLayer);
    vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: styles['MultiLineString'],
        zIndex: 5,
    });

    map.addLayer(vectorLayer);
}

// Chi tiết hướng đãn đường đi
function showResultInstruction(){

}

//
$(".btn-search").click(function(){
    const location_start = $(".location-start").val();
    const location_end = $(".location-end").val();
    const move = $(".move_method").val();

    const params = `point=${location_start}&point=${location_end}&type=json&locale=vi-VN&elevation=false&profile=${move}&points_encoded=false`;
    const url = url_base + params;

    fetch(url)
    .then(res => res.text())
    .then(res => {
        var geojson = JSON.parse(res);
        showResultWay(geojson.paths[0].points);
    });
})