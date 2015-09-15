import State from 'ampersand-state';
// import numeral from 'numeral';

export default State.extend({

    idAttribute: 'hour',

    props: {

      hour: {
        type: 'number',
        default: 1
      },

      zone_id: {
        type: 'number',
        default: 32
      },
      // zone_id: 'number',
      zone_area: 'number',
      zone_name: {
        type: 'string',
        default: ''
      },
      zone_state: {
        type: 'string',
        default: ''
      },
      zone_geometry: 'object'

    },

    derived: {
      zone_desc: {
        deps: ['zone_name', 'zone_state'],
        fn () {
            return this.zone_name ? this.zone_name + ', ' + this.zone_state : ''
        }
      },
    },

    initialize () {
      this.listenTo(app.navs, 'change:active', function (nav) {
        if (nav.active) {
          this.page = nav.getId()
        }
      })

      // this.listenTo(app.counts, 'sync', this.updateZoneInfo)
    },

    updateZoneInfo () {
      const topCounts = app.counts.getTopCounts()
      const selectedZoneCount = app.counts.getInternalOrigins(this.zone_id)
      const outsideCount = app.counts.getExternalOrigins(this.zone_id)
    }

});
