require('./assets/stylesheets/app.scss');
require('whatwg-fetch');
import Iso from 'iso';
import universalRender from 'shared/UniversalRender';
import ConsoleExports from './utils/ConsoleExports';
import {serverApiRecordEvent} from 'app/utils/ServerApiClient';

window.onerror = error => {
    serverApiRecordEvent('client_error', error);
};

Iso.bootstrap(initial_state => {
    console.log('Initial state', initial_state);
    window.$STM_Config = initial_state.offchain.config;
    if (initial_state.offchain.serverBusy) {
        window.$STM_ServerBusy = true;
    }
    if (initial_state.offchain.csrf) {
        window.$STM_csrf = initial_state.offchain.csrf;
        delete initial_state.offchain.csrf;
    }
    const location = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    universalRender({history, location, initial_state})
    .catch(error => {
        console.error(error);
        serverApiRecordEvent('client_error', error);
    });
});

try {
    if(process.env.NODE_ENV === 'development') {
        // Adds some object refs to the global window object
        ConsoleExports.init(window)
    }
} catch (e) {
    console.error(e)
}

// redux-form performance work-around https://github.com/erikras/redux-form/issues/529
// window.reduxFormPerformFix = fields => {
//     Object.keys(fields).forEach(el => {fields[el].onChange = e => {fields[el].value = e.target.value}})
// }

console.log('Google Analytics');
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-76790463-3', 'auto');
ga('send', 'pageview');
