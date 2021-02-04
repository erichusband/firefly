const binding = require('wallet-nodejs-binding')
const PincodeManager = require('../libs/pincodeManager');
const DeepLinkManager = require('../libs/deepLinkManager');
const NotificationManager = require('../libs/notificationManager');
const { ipcRenderer } = require('electron')

const freezeObjectFactory = (obj) => {
    const rejector = {
        get(obj, prop) {
            if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                return new Proxy(obj[prop], rejector)
            }

            return obj[prop]
        },
        set() {
            return false
        },
    }

    return new Proxy(obj, rejector)
}

window.__WALLET__ = freezeObjectFactory(binding)

window.Electron = {
    PincodeManager,
    DeepLinkManager,
    NotificationManager,
    getStrongholdBackupDestination: () => {
        return ipcRenderer.invoke('show-open-dialog', { properties: ['openDirectory'] }).then((result) => {
            if (result.canceled) {
                return null
            }

            return result.filePaths[0]
        })
    },
    /**
     * Gets directory for app's configuration files
     *
     * @method getUserDataPath
     *
     * @returns {Promise}
     */
    getUserDataPath: () => ipcRenderer.invoke('get-path', 'userData'),
    /**
     * Add native window wallet event listener
     * @param {string} event - Target event name
     * @param {function} callback - Event trigger callback
     * @returns {undefined}
     */
    onEvent: function (event, callback) {
        let listeners = this._eventListeners[event];
        if (!listeners) {
            listeners = this._eventListeners[event] = [];
            ipcRenderer.on(event, (e, args) => {
                listeners.forEach((call) => {
                    call(args);
                });
            });
        }
        listeners.push(callback);
    },
    _eventListeners: {},
};
