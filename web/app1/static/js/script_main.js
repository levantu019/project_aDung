const url_base = "http://gis.hometech.vn:8989/route?";

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
function showResultInstruction(data){
    // Remove all child in instructions
    $(".instructions").empty();

    const distance = data.distance;
    const instructions = data.instructions;

    var instruction_wrapper = `<div class="instruction-wrapper">
                                    <div class="instruction-title">
                                        <h2>Hướng dẫn</h2>
                                        <p>Khoảng cách: ${distance}m</p>
                                    </div>
                                    <div class="instruction-detail">
                                        
                                    </div>
                                </div>`
    $(".instructions").append(instruction_wrapper);

    for(let i=0; i<instructions.length; i++){
        let detail_item = `<div class="detail-item">
                            <div class="item-icon"><img src="http://127.0.0.1:8000/icon/${instructions[i].sign}"/></div>
                            <div class="item-content">
                                <div style="max-width: 175px">${instructions[i].text}</div>
                            </div>
                            <div class="item-distance">
                                ${instructions[i].distance}m
                            </div>
                        </div>`

        $(".instruction-detail").append(detail_item);
    }


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
        showResultInstruction(geojson.paths[0]);
    });
})