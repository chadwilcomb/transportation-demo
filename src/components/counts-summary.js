import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';

import CountRow from './count-row'

export default React.createClass({
    mixins: [ampersandMixin],
    displayName: 'CountsSummary',

    componentDidMount () {
      const {mapState, zones} = this.props
      this.listenTo(zones, 'sync', this.render)
    },

    render () {
      const {zones, selectedZoneId} = this.props
      const top = zones.getTopCounts()
      let content = []
      let max
      // console.log('counts-summary-render ' + new Date())

      if (selectedZoneId) {
        top.forEach(function (count) {
          if (!max && count.properties.zone_id !== selectedZoneId) {
            max = count.properties.count
          }
          content.push(<CountRow key={count.properties.zone_id} count={count} max={max || count.properties.count} />)
        })
      }
      return (
        <div id='counts-summary' className='counts-summary'>
          <p>Top Origins:</p>
          {content}
        </div>
      )
    }
})
