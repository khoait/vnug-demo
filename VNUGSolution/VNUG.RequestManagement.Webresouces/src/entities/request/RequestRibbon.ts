import { CdsServiceClient, EntityReference, setMetadataCache, XrmContextCdsServiceClient } from "dataverse-ify";
import {
  vnug_processrequestapprovalMetadata,
  vnug_processrequestapprovalRequest,
} from "../../dataverse-gen/actions/vnug_processrequestapproval";
import { vnug_processrequestapprovalResponse } from "../../dataverse-gen/complextypes/vnug_processrequestapprovalResponse";
import { vnug_request, vnug_requestMetadata } from "../../dataverse-gen/entities/vnug_request";
import { vnug_request_vnug_request_statuscode } from "../../dataverse-gen/enums/vnug_request_vnug_request_statuscode";
import { metadataCache } from "../../dataverse-gen/metadata";

export class RequestRibbon {
  static async ApproveCommandClicked(formContext: Xrm.FormContext) {
    const result = await Xrm.Navigation.openConfirmDialog({
      text: "Are you sure you want to approve this request?",
      title: "Approval Confirmation",
    });

    if (!result.confirmed) return;

    try {
      Xrm.Utility.showProgressIndicator("Approving request...");
      const recordid = formContext.data.entity.getId();
      const updateTarget = {
        statuscode: vnug_request_vnug_request_statuscode.Approved,
      } as vnug_request;
      await Xrm.WebApi.updateRecord(vnug_requestMetadata.logicalName, recordid, updateTarget);
      Xrm.Utility.closeProgressIndicator();
    } catch (ex: any) {
      Xrm.Utility.closeProgressIndicator();
      Xrm.Navigation.openErrorDialog({
        details: ex,
        message: `Failed to approved the request: ${ex.message}`,
      });
    }
  }

  static async RejectCommandClicked(formContext: Xrm.FormContext) {
    const result = await Xrm.Navigation.openConfirmDialog({
      text: "Are you sure you want to reject this request?",
      title: "Approval Confirmation",
    });

    if (!result.confirmed) return;

    try {
      Xrm.Utility.showProgressIndicator("Rejecting request...");

      setMetadataCache(metadataCache);

      const recordid = formContext.data.entity.getId();
      const request = {
        logicalName: vnug_processrequestapprovalMetadata.operationName,
        entity: new EntityReference(vnug_requestMetadata.logicalName, recordid),
        Operation: "reject",
      } as vnug_processrequestapprovalRequest;

      const response = await RequestRibbon.CallApprovalAction(new XrmContextCdsServiceClient(Xrm.WebApi), request);

      const completedOn = response.CompletedOn;

      Xrm.Navigation.openAlertDialog({ text: `Request is rejected on: ${completedOn}` });

      Xrm.Utility.closeProgressIndicator();
    } catch (ex: any) {
      Xrm.Utility.closeProgressIndicator();
      Xrm.Navigation.openErrorDialog({
        details: ex,
        message: `Failed to approved the request: ${ex.message}`,
      });
    }
  }

  static async CallApprovalAction(service: CdsServiceClient, request: vnug_processrequestapprovalRequest) {
    const response = await service.execute(request);
    return response as vnug_processrequestapprovalResponse;
  }
}
