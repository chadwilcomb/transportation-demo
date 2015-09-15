import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import app from 'ampersand-app';

export default React.createClass({
    mixins: [ampersandMixin],
    displayName: 'Map',

    render () {
        return (
            <div id='map' className='map'>
                <div id='loading' className='modal modal-no-sections hidden'>
                    <p>Loading data...</p>
                </div>
            </div>
        )
    },

    componentDidMount () {

        const {mapHelper} = this.props;
        mapHelper.initMap(map);

    },
})
