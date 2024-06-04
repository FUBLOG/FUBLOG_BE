"use strict";

const { format } = require("morgan");
const winston = require("winston");
const { combine, timestamp, printf, json, align } = winston.format;
require("winston-daily-rotate-file");
const { createLogger } = winston;
class LoggerSystem {
  constructor() {
    const formatPrint = format.printf(
      ({ level, message, timestamp, context, requestId, metadata }) => {
        return `[${timestamp}] - ${level}:: ${message}::${context}::${requestId}::${
          metadata ? JSON.stringify(metadata) : ""
        }`;
      }
    );
    this.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        formatPrint
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
          dirname: "src/logs",
          filename: "logs/%DATE%-info.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "1m",
          maxFiles: "14d",
          format: format.combine(
            format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            formatPrint
          ),
          level: "info",
        }),
        new winston.transports.DailyRotateFile({
          dirname: "src/logs",
          filename: "logs/%DATE%-error.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "1m",
          maxFiles: "14d",
          format: format.combine(
            format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            formatPrint
          ),
          level: "error",
        }),
      ],
    });
    
  }
}

module.exports = new LoggerSystem();
