export type LogHandler = (
  message: any,
  trace?: string,
  context?: string,
) => void;
