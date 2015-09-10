import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import DemographicItem from './demographic-item'

export default React.createClass({
    mixins: [ampersandMixin],
    displayName: 'DemographicSection',

    onClickCategory () {
        const {label, category} = this.props;
        const clickable = ['Dining', 'Hotel', 'Grocery'].indexOf(label) >= 0;
        if (clickable) {
            category.category = category.category === label ? null : label;
            category.name = null;
        }
    },

    render: function() {
        const {demographics, label, category} = this.props;
        const clickable = ['Dining', 'Hotel', 'Grocery'].indexOf(label) >= 0;
        let className = !category.name && label === category.category ? 'audience-profile-heading sel-cat' : 'audience-profile-heading';
        className += clickable ? ' clickable' : '';
        const title = clickable ? 'Click to show locations on map.' : '';
        if (demographics.length) {
            return (
                <div>
                    <p className={className} title={title} onClick={this.onClickCategory}>{label}</p>
                    <table className='audience-profile-table'>
                        <tbody>
                        {demographics.map((item) => {
                            return (<DemographicItem clickable={clickable} category={app.category} key={item.name} item={item} />)
                        })}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (<div />);
        }
    }
});
