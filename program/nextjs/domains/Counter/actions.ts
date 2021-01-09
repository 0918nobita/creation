import { actions, action } from '@fleur/fleur';

export const CounterActions = actions('Counter', {
    increase: action<{ amount: number }>(),
    decrease: action<{ amount: number }>(),
});
