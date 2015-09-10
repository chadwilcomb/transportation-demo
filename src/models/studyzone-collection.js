import app from 'ampersand-app';
import Collection from 'ampersand-rest-collection';
import bind from 'lodash.bind';
import GeoJSON from './geojson';

export default Collection.extend({

    model: GeoJSON,

    layerId () {
        return 'zones';
    },

    url () {
        const props = this.cartoDbProps();
        return '//' + props.account + '.cartodb.com/api/v2/sql?q=' + props.sql + ' ' + props.tableName + ' ' + props.sql2 + props.format + props.apiKey;
    },

    parse (response) {
        this.type = response.type;
        return response.features;
    },

    cartoDbProps () {
         return {
            account: 'chadwilcomb',
            tableName: 'nymtc_studyzones',
            format: '&format=GeoJSON',
            apiKey: '',
            sql: 'SELECT * FROM',
            sql2: ''//'ORDER BY cartodb_id',
        }
    },

    baseStyle () {
        return {
            fillColor: '#999',
            color: '#999',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.4
        };
    },

    highlightStyle () {
        return {
            weight: 2,
            color: '#6656a4',
            fillColor: '#6656a4',
            opacity: 1,
            fillOpacity: 0.4
        };

    },

    setStyle (feature) {
        const _this = this;
        let style;
        if (feature.properties.selectedFeature) {
            style = _this.highlightStyle();
        } else {
            style = _this.baseStyle();
        }
        return style;
    },

    onEachFeature (feature, layer) {
        const _this = this;
        layer.on({
            click: function (e) {
                // switch (app.personType.person_type_id) {
                //     case 'Local':
                //     case 'Visitor':
                //         app.showLoading();
                //         break;
                // }
                layer.setStyle(_this.highlightStyle());

                // update app.airport properties from polygon
                // setTimeout(function () {
                //     const {properties, geometry} = e.target.feature;
                //     app.airport.geometry = geometry;
                //     app.airport.set(properties);
                // }, 100);
            }
        });
    },

    leafletOptions() {
        const _this = this;
        return {
            style: bind(_this.setStyle, _this),
            onEachFeature: bind(_this.onEachFeature, _this)

        }
    },

    toGeoJSON () {
        var featureCollection = {
            "type": this.type || "FeatureCollection",
            // "crs": {
            //     "type": "name",
            //     "properties": {
            //         "name": "urn:ogc:def:crs:EPSG::2066"
            //     }
            // },
            "features": []
        };
        featureCollection.features = this.toJSON();
        return featureCollection;
    }
});
