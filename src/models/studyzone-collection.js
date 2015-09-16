import app from 'ampersand-app';
import Collection from 'ampersand-rest-collection';
// import bind from 'lodash.bind';
import d3 from 'd3-scale'
import numeral from 'numeral'

import GeoJSON from './geojson';



export default Collection.extend({

    model: GeoJSON,

    initialize () {
      // this.listenTo(app.mapState, 'change', this.onMapStateChange)
      this.listenTo(app.counts, 'sync', this.updateCounts)
      this.fetch({
        parse: true,
        success () {
          app.counts.populate()
        }
      })
    },

    layerId () {
        return 'zones';
    },

    getZone (zone_id) {
      let zone
      this.forEach(function (model) {
        if (model.properties.zone_id === zone_id) zone = model
      })
      return zone
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
      const style = {
        fillColor: '#999',
        color: '#999',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }
      if (feature.properties.count) {
        style.fillColor = app.countScale(feature.properties.count)

      }
      if (feature.properties.zone_id === app.mapState.zone_id) {
        style.color = '#565656'
        style.fillColor = '#6769B0'
        style.dashArray = 3
        // style.fillOpacity = 0.6
        // style.weight = 3
      } else {
        style.color = '#CCC'
        // style.fillOpacity = 0.8
      }
      return style
    },

    onClickLayer (e) {
      app.mapState.updateZoneInfo(e.target.feature)
      e.layer.bringToFront()
      app.trigger('update-map', app.zones)
    },

    getPopupContent (feature) {
      return feature.properties.name + '<br/>' + (app.mapState.showCounts ? numeral(feature.properties.count).format('0,0') : feature.properties.pct)
    },

    leafletOptions() {
      return {
        style: this.countStyle,
        follow: true
        // onEachFeature: this.onEachFeature
      }
    },

    updateCounts () {
      if (app.counts.length) {
        this.forEach(function (zone) {
          const origin = zone.properties.zone_id
          const destination = app.mapState.zone_id
          const hour = app.mapState.hour
          const model = app.counts.findWhere({ origin: origin, hour: hour, destination: destination })
          zone.properties.count = model ? model.count || 0 : 0
          zone.properties.pct = model ? model.pct || '0%' : '0%'
          if (destination === zone.properties.zone_id) {
            const outside = app.counts.findWhere({ origin: -1, hour: hour, destination: destination })
            app.mapState.zone_count = zone.properties.count
            app.mapState.zone_pct = zone.properties.pct
            app.mapState.zone_count_out = outside ? outside.count || 0 : 0
            app.mapState.zone_pct_out = outside ? outside.pct || '0%' : '0%'
          }
        })
        this.updateScale()
        app.trigger('update-map', this)
      }
    },

    updateScale () {
      const colorBrewerPurple = ['rgb(242,240,247)','rgb(218,218,235)','rgb(188,189,220)','rgb(158,154,200)','rgb(128,125,186)','rgb(106,81,163)','rgb(74,20,134)']
      const colorBrewerYlOrRd = ['rgb(255,255,178)','rgb(254,217,118)','rgb(254,178,76)','rgb(253,141,60)','rgb(252,78,42)','rgb(227,26,28)','rgb(177,0,38)']
      const textYlOrRd = ['#565656','#565656','#FFF','#FFF','#FFF','#FFF','#FFF']
      const others = this.getOtherZones(app.mapState.zone_id)
      const counts = others.map(function (zone) { return zone.properties.count });
      counts.sort(function(a, b) { return a - b })
      app.countScale = d3.quantize().domain(counts).range(colorBrewerYlOrRd);
      app.textScale = d3.quantize().domain(counts).range(textYlOrRd);
    },

    getOtherZones (zoneId) {
      return this.filter(function (model) {
        return model.properties.zone_id !== zoneId
      })
    },

    getTopCounts () {
      const others = this.getOtherZones(app.mapState.zone_id)
      const filtered = others.filter(function (model) { return model.properties.count })
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
