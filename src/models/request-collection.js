import Collection from 'ampersand-rest-collection';
import bind from 'lodash.bind';
import L from 'leaflet';
import numeral from 'numeral';
import GeoJSON from './geojson';

export default Collection.extend({

    model: GeoJSON,

    layerId () {
        return 'requests';
    },

    url () {
        const props = this.cartoDbProps();
        return '//' + props.account + '.cartodb.com/api/v2/sql?q=' + props.sql + ' ' + props.tableName + props.sql2 + props.format + props.apiKey;
    },

    parse (response) {
        this.type = response.type;
        return response.features;
    },

    cartoDbProps () {
         return {
            account: 'chadwilcomb',
            tableName: 'airport_requests',
            format: '&format=GeoJSON',
            apiKey: '',
            sql: 'SELECT * FROM',
            sql2: '',
        }
    },

    baseStyle () {
        return {
            radius: 2,
            fillColor: '#ef425d',
            color: '#ef425d',
            weight: 0,
            opacity: 0.6,
            fillOpacity: 0.6
        };
    },

    highlightStyle () {
        return {
            radius: 2,
            fillColor: '#00b0e9',
            color: '#00b0e9',
            weight: 0,
            opacity: 1,
            fillOpacity: 1
        };

    },

    setStyle (feature) {
        return this.baseStyle();
    },

    popupContent (props) {
        const date = new Date(props.timestamp);
        return '<div>Type: ' + props.person_type_id + '</div>' +
                '<div>' + date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + '</div>';
    },

    pointToLayer (feature, latlng) {
        return L.circleMarker(latlng, this.setStyle(feature));
    },

    onEachFeature (feature, layer) {
        const {properties} = feature;
        var popup = L.popup({ closeButton: false })
            .setContent(this.popupContent(properties));

        layer.bindPopup(popup);

        layer.on('mouseover', function (e) {
            this.openPopup();
        });
    },

    leafletOptions() {
        const _this = this;
        return {
            onEachFeature: bind(_this.onEachFeature, _this),
            pointToLayer: bind(_this.pointToLayer, _this),
        }
    },

    toGeoJSON () {
        var featureCollection = {
            "type": this.type || "FeatureCollection",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:EPSG::2066"
                }
            },
            "features": []
        };
        featureCollection.features = this.toJSON();
        return featureCollection;
    },

});
