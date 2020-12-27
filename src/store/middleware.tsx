import { Middleware } from 'redux';

export function createApiMiddleware<T>(extraArgument: T): Middleware {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}
