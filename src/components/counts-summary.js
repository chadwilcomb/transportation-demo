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
      const {zones, mapState} = this.props
      const top = zones.getTopCounts()
      const showClass = 'pull-right counts-toggle'
      const hideClass = 'pull-right counts-toggle hidden'
      let content = []
      let max
      const pctClass = mapState.showCounts ? showClass : hideClass
      const rawClass = !mapState.showCounts ? showClass : hideClass

      top.forEach(function (count) {
        if (!max && count.properties.zone_id !== mapState.zone_id) {
          max = count.properties.count
        }
        content.push(<CountRow key={count.properties.zone_id} count={count} max={max || count.properties.count} mapState={mapState} />)
      })

      return (
        <div id='counts-summary' className='counts-summary'>
          <div className='zone-header pull-left'>TOP ORIGINS</div>
          <a className={pctClass} onClick={this.toggleCounts}>SHOW PCT%</a>
          <a className={rawClass} onClick={this.toggleCounts}>SHOW RAW</a>
          {content}
        </div>
      )
    },

    showPct (e) {
      const {mapState} = this.props

    },

    toggleCounts (e) {
      e.preventDefault()
      const {mapState} = this.props
      mapState.showCounts = !mapState.showCounts
    }
})
