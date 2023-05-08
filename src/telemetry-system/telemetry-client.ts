import CONSTANTS from '../utils/index';

export default class TelemetryClient {
  private onlineStatus: boolean;
  private diagnosticMessageResult: string;

  constructor() {
    this.onlineStatus = false;
    this.diagnosticMessageResult = '';
  }

  public diagnosticMessage() {
    return 'AT#UD';
  }

  public getOnlineStatus() {
    return this.onlineStatus;
  }

  public connect(telemetryServerConnectionString: string) {
    if (telemetryServerConnectionString === '') {
      throw new Error('missing telemetryServerConnectionString parameter');
    }

    // Simulate the operation on a real modem
    const success = this.connectionEventsSimulator(1, 10) <= 8;

    this.onlineStatus = success;
  }

  public disconnect() {
    this.onlineStatus = false;
  }

  public send(message: string) {
    if (message === '') {
      throw new Error('missing message parameter');
    }

    if (message === this.diagnosticMessage()) {
      // Simulate a status report
      this.diagnosticMessageResult = CONSTANTS.MOCKED_DIAGNOSTIC_MESSAGE;
    }
    // Here should go the real Send operation (not needed for this exercise)
  }

  public receive() {
    let message;

    if (this.diagnosticMessageResult === '') {
      // Simulate a received message (just for illustration - not needed for this exercise)
      message = '';
      const messageLength = this.connectionEventsSimulator(50, 110);
      for (let i = messageLength; i >= 0; --i) {
        message += this.connectionEventsSimulator(40, 126).toString();
      }
    } else {
      message = this.diagnosticMessageResult;
      this.diagnosticMessageResult = '';
    }

    return message;
  }

  // Simulate the operation on a real modem
  private connectionEventsSimulator(min: number, max: number): number {
    const delta = max + 1 - min;
    return min + Math.floor(delta * Math.random());
  }
}
