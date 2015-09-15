import app from 'ampersand-app';
import Collection from 'ampersand-rest-collection';
import bind from 'lodash.bind';
import d3 from 'd3-scale'

import GeoJSON from './geojson';

export default Collection.extend({

    model: GeoJSON,

    initialize () {
      // this.listenTo(app.mapState, 'change', this.onMapStateChange)
      this.listenTo(app.counts, 'sync', this.updateCounts)
    },

    layerId () {
        return 'zones';
    },

    url () {
      const props = this.cartoDbProps()
      return '//' + props.account + '.cartodb.com/api/v2/sql?q=' + props.sql + ' ' + props.tableName + ' ' + props.sql2 + props.format + props.apiKey
    },

    parse (response) {
      this.type = response.type
      return response.features
    },

    toGeoJSON () {
      return {
        "type": "FeatureCollection",
        // "features": this.map(function (model) { return model.toGeoJSON() })
        "features": this.toJSON()
      }
    },

    cartoDbProps () {
      return {
        account: 'chadwilcomb',
        tableName: 'nymtc_studyzones',
        format: '&format=GeoJSON',
        apiKey: '',
        sql: 'SELECT name, shape_area, zone_id, state_name, the_geom FROM',
        sql2: ''//'ORDER BY cartodb_id',
      }
    },

    getCountColor(count) {
      return app.countScale(count)
    },

    getCountDensityColor(count) {
      return app.countDensityScale(count)
    },

    baseStyle () {
      return {
        fillColor: '#999',
        color: '#999',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.4
      }
    },

    highlightStyle () {
      return {
        weight: 2,
        color: '#6656a4',
        fillColor: '#6656a4',
        opacity: 1,
        fillOpacity: 0.4
      }
    },

    countStyle (feature) {
      if (feature.properties.count) {
        return {
          fillColor: app.countScale(feature.properties.count),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
        }
      } else if (feature.properties.zone_id === app.mapState.zone_id) {
        return {
          weight: 2,
          color: '#6656a4',
          fillColor: '#6656a4',
          opacity: 1,
          fillOpacity: 0.4
        }
      } else {
        return {
          fillColor: '#999',
          color: '#999',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.4
        }
      }

    },

    distributionStyle () {
      return {
        fillColor: app.distributionScale(feature.properties.count),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      }
    },

    setStyle (feature) {
        let style
        switch (app.selectedLayer) {
          case 'counts':
          case 'hourly':
            style = this.countStyle
            break;
          case 'distribution':
            style = this.distributionStyle
            break;
          default:
            if (feature.selectedFeature) {
              style = this.highlightStyle()
            } else {
              style = this.baseStyle()
            }
            break;
        }

        return style
    },

    // onEachFeature (feature, layer) {
    //     const _this = this
    //     layer.bindPopup(feature.properties.name)
    //     layer.on({
    //       click: function (e) {
    //         const {properties, geometry} = e.target.feature
    //         app.mapState.set({
    //           zone_id: properties.zone_id,
    //           zone_name: properties.name,
    //           zone_state: properties.state_name,
    //           zone_area: properties.shape_area,
    //           zone_geometry: properties.geometry
    //         })
    //       },
    //       mouseover: function (e) {
    //         this.openPopup()
    //         //open popup;
    //       },
    //       // mouseout: function (e) {
    //       //   // this.closePopup()
    //       // }
    //     })
    // },

    onClickLayer (e) {
      const {properties, geometry} = e.target.feature
      app.mapState.set({
        zone_id: properties.zone_id,
        zone_name: properties.name,
        zone_state: properties.state_name,
        zone_area: properties.shape_area,
        zone_geometry: properties.geometry
      })
      e.layer.bringToFront()
      app.trigger('update-map', app.zones)
    },

    getPopupContent (feature) {
      return feature.properties.name
    },

    leafletOptions() {
      return {
        style: this.countStyle,
        // onEachFeature: this.onEachFeature
      }
    },

    // onMapStateChange () {
    //   console.log('onMapStateChange')
    //   this.updateCounts()
    //
    //   // switch (app.navs.get('active').first().getId()) {
    //   //   case 'counts':
    //   //     this.updateCounts()
    //   //     break;
    //   //   default:
    //   //
    //   // }
    // },

    updateCounts () {
      if (app.counts.length) {
        this.forEach(function (zone) {
          const origin = zone.properties.zone_id
          const destination = app.mapState.zone_id
          const hour = app.mapState.hour
          const model = app.counts.findWhere({ origin: origin, hour: hour, destination: destination })
          zone.properties.count = model ? model.count || 0 : 0
          zone.properties.countDensity = zone.properties.count / zone.properties.shape_area
        })
        this.updateScale()
        app.trigger('update-map', this)
      }
    },

    updateScale () {
      const colorBrewerPurple = ['rgb(242,240,247)','rgb(218,218,235)','rgb(188,189,220)','rgb(158,154,200)','rgb(128,125,186)','rgb(106,81,163)','rgb(74,20,134)']
      const colorBrewerYlOrRd = ['rgb(255,255,178)','rgb(254,217,118)','rgb(254,178,76)','rgb(253,141,60)','rgb(252,78,42)','rgb(227,26,28)','rgb(177,0,38)']
      const others = this.getOtherZones(app.mapState.zone_id)
      const counts = others.map(function (zone) { return zone.properties.count });
      const countDensitys = others.map(function (zone) { return zone.properties.countDensity });
      // const distributions = this.map(function (zone) { return zone.distribution });
      counts.sort(function(a, b) { return a - b })
      app.countScale = d3.quantize().domain(counts).range(colorBrewerYlOrRd);
      app.countDensityScale = d3.quantize().domain(countDensitys).range(colorBrewerYlOrRd);
      // this.distributionScale = d3.quantize().domain(distributions).range(colorBrewer);
    },

    getOtherZones (zoneId) {
      return this.filter(function (model) {
        return model.properties.zone_id !== zoneId
      })
    },

    getTopCounts () {
      const others = this.getOtherZones(app.mapState.zone_id)
      const filtered = others.filter(function (model) { return model.properties.count })
      // const props = filtered.map(function (model) { return model.properties })
      const sorted = filtered.sort(function (a, b) {
        return a.properties.count - b.properties.count
      })
      const reversed = sorted.reverse()
      const top = reversed.slice(0,10)
      return top
    },

    getZoneInfo (zoneId) {
      const zoneInfo = {
        name: '',
        insideCount: 0,
        topCounts: [],
        outsideCount: 0,
      };
      const model = this.findWhere({ zone_id: zoneId })
      return model
    }
});
