import { reducerStore } from '@fleur/fleur';
import { CounterActions } from './actions';

interface State {
  count: number;
}

export const CounterStore = reducerStore<State>('CounterStore', () => ({
    count: 0,
}))
    .listen(CounterActions.increase, (draft, payload) => {
        draft.count += payload.amount;
    })
    .listen(CounterActions.decrease, (draft, payload) => {
        draft.count -= payload.amount;
    });
