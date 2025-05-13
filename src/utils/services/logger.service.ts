import winston from "winston";
import moment from "moment";

export class LoggerService {
  private static logger: any

  static info(message: string) {
    this.logger.info(message);
  }

  static error(message: string) {
    this.logger.error(message);
  }

  static warn(message: string) {
    this.logger.warn(message);
  }

  static profile(message: string) {
    this.logger.profile(message);
  }

  static init() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        this.logFormat()
      ),
      transports: [
        new winston.transports.Console()
      ],
    })
  }

  private static logFormat() {
    return winston.format.printf(({timestamp, level, message, durationMs}) => {
      const memoryInfo = this.memoryUsage();

      const date = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');

      const duration = durationMs ? `(Tempo de execução: ${durationMs}ms)` : '';

      return `${date} > (${memoryInfo}) > [${level.toUpperCase()}]: ${message} | ${duration}`;
    });
  }

  private static memoryUsage() {
    const memoryUsage = process.memoryUsage();
    return `RSS: ${(memoryUsage.rss / 1024 ** 2).toFixed(2)} MB | Heap (Total): ${(memoryUsage.heapTotal / 1024 ** 2).toFixed(2)} MB | Heap (Usada): ${(memoryUsage.heapUsed / 1024 ** 2).toFixed(2)} MB`;
  }

}