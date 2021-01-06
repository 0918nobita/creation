import { selector } from '@fleur/fleur';
import { CounterStore } from './store';

export const selectCount = selector(getState => getState(CounterStore).count);
