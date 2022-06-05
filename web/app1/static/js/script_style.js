
// Tao style để thêm icon 
function createStyle(src, img) {
    return new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.96],
            crossOrigin: 'anonymous',
            src: src,
            img: img,
            imgSize: img ? [img.width, img.height] : undefined,
        }),
    });
}

// 
var icon_start = null;
var icon_end = null;
var current_icon_start;
var current_icon_end;
function addIcon(name, img){
    const iconFeature = new ol.Feature(new ol.geom.Point(coordinates));
    iconFeature.set('style', createStyle(img, undefined));
    name = new ol.layer.Vector({
        style: function (feature) {
            return feature.get('style');
        },
        source: new ol.source.Vector({features: [iconFeature]}),
        zIndex: 5,
    });
    map.addLayer(name);

    return name;
}

// Sự kiện khi chọn menuItem trong right-click
$(".choice-start").click(function(){
    $(".directions-form").show();
    $(".location-start").val([coordinates[1], coordinates[0]].toString());
    map.removeLayer(current_icon_start);
    current_icon_start = addIcon(icon_start, '../static/icons/location_green.png');
})

$(".choice-end").click(function(){
    $(".directions-form").show();
    $(".location-end").val([coordinates[1], coordinates[0]].toString());
    map.removeLayer(current_icon_end);
    current_icon_end = addIcon(icon_start, '../static/icons/location_red.png');
})