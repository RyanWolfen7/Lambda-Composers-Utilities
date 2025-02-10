/**
 * Adds a logger to a composer
 * @param {event}
 * @param {context}
 * @param {callback}
 *
 * @returns {props, logger}
 */

import { DefaultLogger } from '../utils/logging/index.mjs';

const useLogger = (arg) => {
  if(arg.event) {
    arg.logger = new DefaultLogger()
    return arg
  } else {
    return (state) => {
      state.logger = arg
      return state
    }
  }
}

export default useLogger;
