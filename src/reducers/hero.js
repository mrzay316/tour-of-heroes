import { SAVE_HERO } from '../actions';
import { DELETE_HERO } from '../actions';

export const hero = (state, action) => {
    let heroesList = [];
    let index = null;
    switch (action.type) {
        //Guarda la información de un heroe existente o crea uno nuevo
        case SAVE_HERO:
            heroesList = [...state.heroesList];
            index = state.heroesList.findIndex(hero => hero.id === action.payload.id);
            //Encontro el index, es decir, se esta editando un heroe
            if(index !== -1){
                let HeroDetails = action.payload;
                heroesList[index].name = HeroDetails.name;
                heroesList[index].superpower = HeroDetails.superpower;
                heroesList[index].isFavorite = HeroDetails.isFavorite;
                return {...state, heroesList:heroesList}
            } 
            // Se esta creando un heroe nuevo
            else {
                let newHeroDetails = action.payload;
                let newHeroSequence = newHeroDetails.id+1;
                heroesList.push(newHeroDetails);
                return {...state, heroSequence:newHeroSequence, heroesList:heroesList}
            }
        //Elimina un heroe
        case DELETE_HERO:
            index = state.heroesList.findIndex(hero => hero.id === action.payload);
            heroesList = [...state.heroesList];
            heroesList.splice(index, 1);
            return { ...state, heroesList: heroesList };
        default:
            return state;
    }
}