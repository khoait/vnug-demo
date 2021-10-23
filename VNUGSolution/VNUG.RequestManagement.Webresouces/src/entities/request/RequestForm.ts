import { vnug_requestAttributes } from "../../dataverse-gen/entities/vnug_request";

export class RequestForm {
  static async OnLoad(executionContext: Xrm.Events.EventContext) {
    const formContext = executionContext.getFormContext();

    const name = formContext.getAttribute<Xrm.Attributes.StringAttribute>(vnug_requestAttributes.vnug_name);

    Xrm.Navigation.openAlertDialog({
      text: name?.getValue() ?? "default",
      title: "Onload dialog",
      confirmButtonLabel: "Ok watch 444",
    });
  }
}
