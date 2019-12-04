import { createStore } from 'redux';
import { hero } from '../reducers/hero';

const initialState = { 
    heroesList : [
        { id: 1, name: 'Dr Nice', superpower: 'Being super nice', isFavorite: true },
        { id: 2, name: 'Narco', superpower: 'Using drugs for good', isFavorite: true },
        { id: 3, name: 'Bombasto', superpower: 'Exploding things', isFavorite: false },
        { id: 4, name: 'Celeritas', superpower: 'Really fast', isFavorite: false },
        { id: 5, name: 'Magneta', superpower: 'Magnetize everything', isFavorite: true },
        { id: 6, name: 'RubberMan', superpower: 'Stretchy', isFavorite: true },
        { id: 7, name: 'Dynama', superpower: 'Generate electricity', isFavorite: false },
        { id: 8, name: 'Dr IQ', superpower: 'Smart man', isFavorite: false },
        { id: 9, name: 'Magma', superpower: 'Ouch it burns!', isFavorite: false },
        { id: 10, name: 'Tornado', superpower: 'Becomes a tornado', isFavorite: false }
    ],
    heroSequence : 11,
    activeComponent: 'dashboard',
    callingComponent: ''
}

export const store = createStore(hero, initialState,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());