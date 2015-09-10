import Collection from 'ampersand-rest-collection';
import bind from 'lodash.bind';
import L from 'leaflet';
import GeoJSON from './geojson';


export default Collection.extend({

    model: GeoJSON,

    layerId () {
        return 'homedwells';
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
            tableName: 'traveler_homedwell',
            format: '&format=GeoJSON',
            apiKey: '',
            sql: 'SELECT * FROM',
            sql2: '',
        }
    },

    baseStyle () {
        return {
            radius: 2,
            fillColor: '#aaa',
            color: '#aaa',
            weight: 0,
            opacity: 0.8,
            fillOpacity: 0.8
        };
    },

    highlightStyle () {
        return {
            radius: 2,
            fillColor: '#6656a4',
            color: '#6656a4',
            weight: 0,
            opacity: 1,
            fillOpacity: 1
        };

    },

    popupContent (props) {
        let content = '';
        if (props.person_type_id === 'Local') {
            content += '<div>Departing from: ' + props.airport_id + '</div>' +
                    '<div>Destination: ' + props.destination + '</div>';
        }
        content += '<div>Top Dining: ' + props.top_dining + '</div>' +
                '<div>Top Retail: ' + props.top_retail + '</div>' +
                '<div>Top Grocery: ' + props.top_grocery + '</div>';
        return content;
    },

    setStyle (feature) {
        let style;
        if (feature.properties.airport_id === app.airport.getId()) {
            style = this.highlightStyle();
        } else {
            style = this.baseStyle();
        }
        return style;
    },

    pointToLayer (feature, latlng) {
        return L.circleMarker(latlng, this.setStyle(feature));
    },

    onEachFeature (feature, layer) {
        const {properties} = feature;
        if (properties.airport_id === app.airport.getId()) {

            var popup = L.popup({ closeButton: false })
                .setContent(this.popupContent(properties));

            layer.bindPopup(popup);

            layer.on('mouseover', function (e) {
                this.openPopup();
            });
        }
    },

    leafletOptions() {
        const _this = this;
        return {
            onEachFeature: bind(_this.onEachFeature, _this),
            pointToLayer: bind(_this.pointToLayer, _this),
        };
    },

    toGeoJSON () {
        var featureCollection = {
            "type": "FeatureCollection",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:EPSG::2066"
                }
            },
            "features": []
        };
        featureCollection.features = this.filterFeatures();
        return featureCollection;
    },

    filterFeatures () {

        const features = this.filter(function (feature) {
            return app.personType.person_type_id && feature.properties.person_type_id === app.personType.person_type_id;
        });

        return features || [];
    }
});
