import State from 'ampersand-state';
// import numeral from 'numeral';

export default State.extend({

    idAttribute: 'hour',

    props: {

      hour: {
        type: 'number',
        default: 9
      },

      zone_id: {
        type: 'number',
        default: 32
      },
      // zone_id: 'number',
      zone_area: 'number',
      zone_count: {
        type: 'number',
        default: 0
      },
      zone_pct: {
        type: 'string',
        default: '0%'
      },
      zone_count_out: {
        type: 'number',
        default: 0
      },
      zone_pct_out: {
        type: 'string',
        default: '0%'
      },
      zone_name: {
        type: 'string',
        default: ''
      },
      zone_state: {
        type: 'string',
        default: ''
      },
      showCounts: {
        type: 'boolean',
        default: false
      }
    },

    derived: {
      zone_desc: {
        deps: ['zone_name', 'zone_state'],
        fn () {
            return this.zone_name ? this.zone_name + ', ' + this.zone_state : ''
        }
      },
    },

    startListening () {
      this.listenToOnce(app.zones, 'sync', this.updateMe)
      // this.listenTo(app.navs, 'change:active', function (nav) {
      //   if (nav.active) {
      //     this.page = nav.getId()
      //   }
      // })

      // this.listenTo(app.counts, 'sync', this.updateZoneInfo)
    },
    updateMe () {
      var selectedZone = app.zones.getZone(this.zone_id)
      this.updateZoneInfo(selectedZone);
    },
    updateZoneInfo (zone) {
      this.zone_id = zone.properties.zone_id
      this.zone_name = zone.properties.name
      this.zone_state = zone.properties.state_name
      this.zone_area = zone.properties.shape_area
    }

    // updateZoneInfo () {
    //   const topCounts = app.counts.getTopCounts()
    //   const selectedZoneCount = app.counts.getInternalOrigins(this.zone_id)
    //   const outsideCount = app.counts.getExternalOrigins(this.zone_id)
    // }

});
