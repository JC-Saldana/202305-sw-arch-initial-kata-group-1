import TelemetryClient from './telemetry-client';
import CONSTANTS from '../utils/index';

export default class TelemetryDiagnosticControls {
  private diagnosticChannelConnectionString: string;

  private telemetryClient: TelemetryClient;
  private diagnosticInfo: string;

  constructor() {
    this.diagnosticChannelConnectionString =
      CONSTANTS.DIAGNISTIC_CHANNEL_CONNECTION_STRING;
    this.telemetryClient = new TelemetryClient();
    this.diagnosticInfo = '';
  }

  public readDiagnosticInfo() {
    return this.diagnosticInfo;
  }

  public writeDiagnosticInfo(newValue: string) {
    this.diagnosticInfo = newValue;
  }

  public attemptConnection() {
    let retryLeft = 3;
    while (this.telemetryClient.getOnlineStatus() === false && retryLeft > 0) {
      this.telemetryClient.connect(this.diagnosticChannelConnectionString);
      retryLeft -= 1;
    }

    if (this.telemetryClient.getOnlineStatus() === false) {
      throw new Error('Unable to connect');
    }
  }

  public checkTransmission() {
    this.diagnosticInfo = '';

    this.telemetryClient.disconnect();
    this.attemptConnection();

    this.telemetryClient.send(this.telemetryClient.diagnosticMessage());
    this.diagnosticInfo = this.telemetryClient.receive();
  }
}
