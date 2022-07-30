/* eslint-disable*/
import { vnug_requestMetadata } from "./entities/vnug_request";
import { vnug_processrequestapprovalMetadata } from "./actions/vnug_processrequestapproval";

export const Entities = {
  vnug_request: "vnug_request",
};

// Setup Metadata
// Usage: setMetadataCache(metadataCache);
export const metadataCache = {
  entities: {
    vnug_request: vnug_requestMetadata,
  },
  actions: {
    vnug_processrequestapproval: vnug_processrequestapprovalMetadata,
  }
};