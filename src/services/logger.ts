const prefix = '[AuthTracker]';
const isTestEnv = process.env.NODE_ENV === 'test';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

type LogFunction = (message: string, ...meta: unknown[]) => void;

/**
 * Returns a log function for the specified log level.
 *
 * @param level The log level ('info', 'warn', 'error', 'debug').
 * @returns A function that logs messages at the specified level.
 */
const write = (level: LogLevel): LogFunction => {
  if (isTestEnv) {
    return () => { };
  }

  return (message: string, ...meta: unknown[]) => {
    const payload = `${prefix} ${message}`;

    switch (level) {
      case 'error':
        console.error(payload, ...meta);
        break;
      case 'warn':
        console.warn(payload, ...meta);
        break;
      case 'debug':
        console.debug(payload, ...meta);
        break;
      default:
        console.log(payload, ...meta);
        break;
    }
  };
};

/**
 * Logger utility for info, warn, error, and debug messages.
 */
export const logger = {
  info: write('info'),
  warn: write('warn'),
  error: write('error'),
  debug: write('debug'),
};
