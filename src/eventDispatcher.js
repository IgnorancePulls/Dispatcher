var EventDispatcher = {

    /**
     * @param {string} name
     * @param {function} callback
     * @param {Object} opt_scope
     */
    addEventListener: function (name, callback, opt_scope) {
        var subscribers = this[name] || [];
        var subscriber = {
            action: callback,
            options: opt_scope || null
        };

        subscribers.push(subscriber);
        this[name] = subscribers;
    },

    /**
     * @param {string} name
     * @param {function} callback
     * @param {Object} opt_scope
     */
    removeEventListener: function (name, callback, opt_scope) {
        this[name] = this[name].filter(function(subscriber) {
            return subscriber.action !== callback;
        });
    },

    /**
     * @param {string} name
     */
    dispatchEvent: function (name) {
        this[name].forEach(function(subscriber) {
            subscriber.action.call(subscriber.options);
        });
    },

    /**
     * @param {string} name
     * @return {boolean}
     */
    hasListenerFor: function (name) {
        return this.hasOwnProperty(name);
    },

    /**
     * @param {string} name
     * @param {function} callback
     * @return {boolean}
     */
    hasCallbackFor: function (name, callback) {
        return this[name].some(function (subscriber) {
            return subscriber.action === callback;
        });
    },

    mixin: function (instance) {
        Object.assign(instance, this);
    }
};
