import { XrmMockGenerator } from "xrm-mock";
import { vnug_requestAttributes } from "../../../dataverse-gen/entities/vnug_request";
import { RequestForm } from "../RequestForm";

describe("RequestForm", () => {
  test("show dialog on form load", () => {
    // Arrange
    XrmMockGenerator.initialise();
    const context = XrmMockGenerator.getEventContext();

    const nameVal = "unit test";
    XrmMockGenerator.Attribute.createString(vnug_requestAttributes.vnug_name, nameVal);

    Xrm.Navigation.openAlertDialog = jest.fn();
    // Act
    RequestForm.OnLoad(context);

    // Assert
    expect(Xrm.Navigation.openAlertDialog).toBeCalledWith(
      expect.objectContaining({
        text: nameVal,
        title: expect.any(String),
        confirmButtonLabel: expect.any(String),
      } as Xrm.Navigation.AlertStrings),
    );
  });
});
