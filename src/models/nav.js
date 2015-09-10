import State from 'ampersand-state';

export default State.extend({


    props: {
        id: 'string',
        title: 'string',
        url: 'string',
        active: {
            type: 'boolean',
            default: false
        },
        personTypeId: 'string'
    },

    initialize () {
        this.on('change:active', this.onActiveChanged);
    },

    onActiveChanged (activeModel, active) {
        if (active) {
            this.collection.forEach(function (model) {
                if (model.id !== activeModel.id) {
                    model.set({ active: false });
                }
            });
        }
    }

});
