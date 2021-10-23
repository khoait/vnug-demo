/* eslint-disable*/
import { WebApiExecuteRequest } from "dataverse-ify";
import { StructuralProperty } from "dataverse-ify";
import { OperationType } from "dataverse-ify";

// Action vnug_processrequestapproval
export const vnug_processrequestapprovalMetadata = {
  boundParameter: "entity",
  parameterTypes: {
    "entity": {
      typeName: "mscrm.vnug_request",
      structuralProperty: StructuralProperty.EntityType
      },		
      "Operation": {
      typeName: "Edm.String",
      structuralProperty: StructuralProperty.PrimitiveType
      },		
  
  },
  operationType: OperationType.Action,
  operationName: "vnug_processrequestapproval"
};

export interface vnug_processrequestapprovalRequest extends WebApiExecuteRequest {
  entity?: import("dataverse-ify").EntityReference | import("../entities/vnug_request").vnug_request;
  Operation?: string;
}