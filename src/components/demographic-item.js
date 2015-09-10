import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({
    mixins: [ampersandMixin],
    displayName: 'DemographicItem',

    onClickName () {
        const {item, category, clickable} = this.props;
        if (clickable) {
            category.category = category.name === item.name ? null : item.category;
            category.name = category.name === item.name ? null : item.name;
        }

    },

    render: function() {
        const {item, category, clickable} = this.props;
        let className = item.name === category.name ? 'sel-cat-name' : '';
        className += clickable ? ' clickable' : '';
        const title = clickable ? 'Click to show locations on map.' : '';
        return (
            <tr className={className} title={title} onClick={this.onClickName} key={item.name}><td>{item.name}</td><td>{item.index}</td></tr>
        )
    }

});
