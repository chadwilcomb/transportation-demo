import app from 'ampersand-app';
import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import L from 'leaflet';
import Map from '../components/map-view';
import Sidebar from '../components/sidebar';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'DemoPage',

    render () {
        const {navs} = this.props;
        return (
            <div className='demo-container'>
                <Map mapHelper={app.mapHelper} />
                <Sidebar mapState={app.mapState} zones={app.zones} counts={app.counts} />
            </div>
        );
    }

})
