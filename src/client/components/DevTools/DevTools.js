import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor
    changePositionKey="ctrl-Q"
    toggleVisibilityKey="ctrl-H"
  >
    <LogMonitor />
  </DockMonitor>
);
