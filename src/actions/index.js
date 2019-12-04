export const SAVE_HERO = 'SAVE_HERO';
export const DELETE_HERO = 'DELETE_HERO';
export const SET_COMPONENTS = 'SET_COMPONENTS';

export const saveHero = payload => ({type:SAVE_HERO, payload}); 
export const deleteHero = payload => ({type:DELETE_HERO, payload});
export const setComponents = payload => ({type:SET_COMPONENTS, payload});