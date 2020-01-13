
import React from 'react';
import { hydrate } from 'react-dom';
import store from './store'
import APP from './app'
import './styles/index.css'
hydrate(
    <APP store={store}/>,
    document.querySelector('#root')
);