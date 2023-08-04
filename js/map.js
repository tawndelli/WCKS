import TileLayer from '../node_modules/ol/layer/Tile.js';

window.onload = init;

function init() {
    const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([-95.53382029032018, 29.969759096356896])),
        name: 'Somewhere near Nottingham',
    });

    var attribution = new ol.control.Attribution({
        collapsible: false
    });

    const map = new ol.Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new ol.source.OSM(),
            }), 
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [iconFeature]
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: 'https://openlayers.org/en/latest/examples/data/icon.png'
                    })
                })
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([-95.53382029032018, 29.969759096356896]),
            zoom: 16,
        })
    });

    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
    map.addOverlay(overlay);

    closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };

    map.on('singleclick', function (event) {
        if (map.hasFeatureAtPixel(event.pixel) === true) {
            var coordinate = event.coordinate;

            overlay.setPosition(coordinate);
        } else {
            overlay.setPosition(undefined);
            closer.blur();
        }
    });

    content.innerHTML = '<b>Iron Sports Ninja Warrior</b><br /><span style="color:blue">6982 FM 1960 F, Houston, TX 77069</span><br /><form><button class="ui icon button" formaction="https://www.google.com/maps/dir//Iron+Sports+Ninja+Warrior,+6982+FM+1960+F,+Houston,+TX+77069/@29.9696072,-95.5365562,17z/data=!3m1!5s0x8640cdc6ebefe7d1:0xec262be3d08cca60!4m18!1m8!3m7!1s0x8640cdc63f039d7f:0x9bb3e0987d65bccf!2sIron+Sports+Ninja+Warrior!8m2!3d29.96955!4d-95.5337881!15sCg9pcm9uIHNwb3J0cyBneW1aESIPaXJvbiBzcG9ydHMgZ3ltkgEDZ3lt4AEA!16s%2Fg%2F1tcv1v1v!4m8!1m0!1m5!1m1!1s0x8640cdc63f039d7f:0x9bb3e0987d65bccf!2m2!1d-95.5337881!2d29.96955!3e3?entry=ttu" formtarget="_blank"><i class="map icon"></button></form>';
    overlay.setPosition(ol.proj.fromLonLat([- 95.53382029032018, 29.969759096356896]));
}
