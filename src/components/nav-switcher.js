import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import app from 'ampersand-app';

export default React.createClass({
    mixins: [ampersandMixin],
    displayName: 'LayerToggle',

    handleClick () {
        const {nav} = this.props;
        nav.active = true;
        // if (nav.id !== 'airports') {
        //     app.showLoading();
        // }
        // app.personType.person_type_id = nav.personTypeId;
    },

    render () {
        const {nav} = this.props;
        let content;
        let lastOne = nav.collection.indexOf(nav) === nav.collection.length - 1;

        if (nav.active) {
            content = (
                <a href={nav.url} className='current-item'>{nav.title}</a>
            )
        } else {
            content = (
                <a href={nav.url} onClick={this.handleClick} className=''>{nav.title}</a>
            )
        }

        return (
            <li className='button-group'>{content}{lastOne ? '' : '>'}</li>
        )
    }
});
