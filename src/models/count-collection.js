import Collection from 'ampersand-rest-collection';
import Count from './count';
import app from 'ampersand-app';

export default Collection.extend({

    model: Count,

    comparator: 'value',

    initialize () {
      this.listenTo(app.mapState, 'change:zone_id change:hour', this.populate)
    },

    url () {
      const props = this.cartoDbProps()
      return '//' + props.account + '.cartodb.com/api/v2/sql?q=' + props.sql + ' ' + props.tableName + ' ' + props.sql2 + props.format + props.apiKey
    },

    parse (response) {
      this.fields = response.fields;
      this.time = response.time;
      return response.rows;
    },

    cartoDbProps () {
      return {
        account: 'chadwilcomb',
        tableName: 'zone_pair_hourly_counts',
        format: '',
        apiKey: '',
        sql: 'SELECT origin,destination,hour,count FROM',
        sql2: 'WHERE destination = ' + app.mapState.zone_id + ' AND hour = ' + app.mapState.hour,
      }
    },

    populate () {
      if (app.selectedLayer === 'counts') {
        this.fetch({
          parse: true
        })
      }
    },

    getInternalOrigins (zoneId) {
      const selected = this.findWhere({ origin: zoneId, destination: zoneId });
      return selected.count;
    },


});
