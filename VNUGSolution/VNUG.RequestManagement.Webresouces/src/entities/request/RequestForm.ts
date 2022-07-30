import { vnug_requestAttributes } from "../../dataverse-gen/entities/vnug_request";

export class RequestForm {
  static async OnLoad(executionContext: Xrm.Events.EventContext) {
    const formContext = executionContext.getFormContext();

    const name = formContext.getAttribute<Xrm.Attributes.StringAttribute>(vnug_requestAttributes.vnug_name)?.getValue();

    Xrm.Navigation.openAlertDialog({
      text: name ?? "default",
      title: "Onload dialog",
      confirmButtonLabel: "Ok",
    });
  }
}
