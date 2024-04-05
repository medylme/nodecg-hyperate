/* eslint-disable max-len */

import { HrReplicant } from '@nodecg-hyperate/types/schemas';
import { get as nodecg } from './nodecg';

export const trackedIds = nodecg().Replicant<string[]>('trackedIds', 'nodecg-hyperate', {
  defaultValue: [],
  persistent: true,
  persistenceInterval: 1000,
});
export const hrReplicant = nodecg().Replicant<HrReplicant>('hrReplicant', 'nodecg-hyperate', {
  defaultValue: {},
  persistent: true,
  persistenceInterval: 100,
});
