import { operations } from '@fleur/fleur';
import { CounterActions } from './actions';

export const CounterOps = operations({
  increase(ctx, amount: number) {
    ctx.dispatch(CounterActions.increase, { amount });
  },
  decrease(ctx, amount: number) {
    ctx.dispatch(CounterActions.decrease, { amount });
  },
});
