import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/inertia-progress';

const el = document.getElementById('app');

ReactDOM.render(
    <App 
        initialPage={JSON.parse(el.dataset.page)} 
        resolveComponent={(name) => require(`./Pages/${name}`).default} 
    />,
    el
);

InertiaProgress.init();
