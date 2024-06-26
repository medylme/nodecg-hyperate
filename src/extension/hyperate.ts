/* eslint-disable max-len */
// eslint-disable-next-line import/no-extraneous-dependencies
import ReconnectingWebSocket from 'reconnecting-websocket';
import WebSocket from 'ws';
import { get as nodecg } from './util/nodecg';
import { trackedIds, hrReplicant } from './util/replicants';

const WS_KEY = process.env.HYPERATE_API_KEY;
if (!WS_KEY) {
  throw new Error('Missing Hyperate API key! Did you forget to set the HYPERATE_API_KEY environment variable?');
}

function joinChannel(ws: WebSocket | ReconnectingWebSocket, id: string): void {
  ws.send(JSON.stringify({
    topic: `hr:${id}`,
    event: 'phx_join',
    payload: {},
    ref: 0,
  }));
}

function leaveChannel(ws: WebSocket | ReconnectingWebSocket, id: string): void {
  ws.send(JSON.stringify({
    topic: `hr:${id}`,
    event: 'phx_leave',
    payload: {},
    ref: 0,
  }));
}

function keepAlive(ws: WebSocket | ReconnectingWebSocket): void {
  ws.send(JSON.stringify({
    topic: 'phoenix',
    event: 'heartbeat',
    payload: {},
    ref: 0,
  }));
}

// Connect to HypeRate
const ws = new ReconnectingWebSocket(`wss://app.hyperate.io/socket/websocket?token=${WS_KEY}`, [], { WebSocket });
let lastConnectionState = false;

ws.onopen = () => {
  nodecg().log.info('Connected to HypeRate API.');
  lastConnectionState = true;

  // Keep connection alive
  setInterval(() => {
    keepAlive(ws);
    nodecg().log.debug('Sending heartbeat to HypeRate API.');
  }, 10000);

  trackedIds.on('change', (newVal, oldVal) => {
    if (oldVal && newVal) {
      // Calculate diff
      const idsToLeave = oldVal.filter((id) => !newVal.includes(id));
      const idsToJoin = newVal.filter((id) => !oldVal.includes(id));

      // Join/leave channels as needed
      idsToLeave.forEach((id) => leaveChannel(ws, id));
      idsToJoin.forEach((id) => joinChannel(ws, id));

      // Clear values in replicant
      idsToLeave.forEach((id) => {
        hrReplicant.value[id] = undefined;
      });
    } else if (!oldVal && newVal) {
      // If no oldVal, join all channels in newVal
      newVal.forEach((id) => joinChannel(ws, id));
    } else if (oldVal && !newVal) {
      // If newVal is empty, leave all channels
      oldVal.forEach((id) => leaveChannel(ws, id));
      // Clear values in replicant
      oldVal.forEach((id) => {
        hrReplicant.value[id] = undefined;
      });
    }
  });

  // Listen for HR updates
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data.toString());

      trackedIds.value.forEach((element) => {
        if (data.event === 'hr_update' && data.topic === `hr:${element}`) {
          const id = data.topic.split(':')[1];
          const { hr } = data.payload;

          if (Number(hr) === 0) return;

          hrReplicant.value[id] = { id, hr };
          nodecg().sendMessage('hr-update', id);
        }
      });

      if (hrReplicant.value) {
        nodecg().log.debug('Received HR data:', hrReplicant.value);
      }
    } catch (err) {
      nodecg().log.error('Error parsing HypeRate data:', err);
    }
  };
};

ws.onclose = () => {
  if (!lastConnectionState) return;
  nodecg().log.warn('Lost connection to HypeRate API.');
  lastConnectionState = false;
};
