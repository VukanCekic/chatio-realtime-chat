import winston, { createLogger, format, transports } from "winston";

const myCustomFormat = format.combine(
  format.timestamp(),
  winston.format.colorize(),
  winston.format.json()
);

let alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.label({
    label: "[LOGGER]",
  }),
  winston.format.timestamp({
    format: "YY-MM-DD HH:MM:SS",
  }),
  winston.format.printf(
    (info) => ` ${info.label} ${info.timestamp} ${info.level} : ${info.message}`
  )
);

export const logger = createLogger({
  level: "debug",
  format: winston.format.combine(winston.format.colorize(), alignColorsAndTime),
  transports: [new transports.Console()],
});
