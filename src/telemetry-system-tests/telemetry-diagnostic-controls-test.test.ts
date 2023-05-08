import TelemetryDiagnosticControls from '../telemetry-system/telemetry-diagnostic-controls';
import CONSTANTS from '../utils/index';

describe('Telemetry System', () => {
  describe('TelemetryDiagnosticControls', () => {
    it('CheckTransmission should send a diagnostic message and receive a status message response', () => {
      const telemetryDiagnosticControls = new TelemetryDiagnosticControls();
      telemetryDiagnosticControls.checkTransmission();
      const diagnosticInfo = telemetryDiagnosticControls.readDiagnosticInfo();
      expect(diagnosticInfo).toBe(CONSTANTS.MOCKED_DIAGNOSTIC_MESSAGE);
    });
  });
});
