import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({
    mixins: [ampersandMixin],
    displayName: 'SelectedZoneSummary',

    render () {
        const {mapState} = this.props
        let content, formatted
        if (mapState.hour >= 0) {
          formatted = this.formatHour(mapState.hour)
          content = (
            <div className='hour-info'>
              <div className='zone-header'>SELECTED HOUR</div>
              <nav role='navigation'>
                <ul className='noselect list-unstyled list-inline pagination'>
                  <li><a onClick={this.backHour}><strong>-</strong></a></li>
                  <li><a className='current-item'>{formatted}</a></li>
                  <li><a onClick={this.forwardHour}><strong>+</strong></a></li>
                </ul>
              </nav>
            </div>
          )
        }
        return (
          <div id='selected-zone-summary' className='selected-zone-summary'>
            {content}
          </div>
        )
    },

    backHour () {
      const {mapState} = this.props
      mapState.hour = mapState.hour > 0 ? mapState.hour - 1 : mapState.hour
    },

    forwardHour () {
      const {mapState} = this.props
      mapState.hour = mapState.hour < 23 ? mapState.hour + 1 : mapState.hour
    },

    formatHour (hour) {
      if (hour === 0) {
        return '12:00 am'
      } else if (hour < 12) {
        return hour + ':00 am'
      } else if (hour < 24) {
        return (hour === 12 ? hour : hour - 12) + ':00 pm'
      }
      return hour + ':00 am'
    }
})
