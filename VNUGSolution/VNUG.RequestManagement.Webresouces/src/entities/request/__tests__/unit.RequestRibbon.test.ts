import { XrmMockGenerator } from "xrm-mock";
import { vnug_request, vnug_requestMetadata } from "../../../dataverse-gen/entities/vnug_request";
import { vnug_request_vnug_request_statuscode } from "../../../dataverse-gen/enums/vnug_request_vnug_request_statuscode";
import { RequestRibbon } from "../RequestRibbon";

describe("RequestRibbon", () => {
  describe("Approve button", () => {
    beforeEach(() => {
      XrmMockGenerator.initialise();
      Xrm.WebApi.updateRecord = jest.fn();
    });

    test("return when cancel confirm dialog", async () => {
      // Arrange
      Xrm.Navigation.openConfirmDialog = jest
        .fn()
        .mockReturnValue({ confirmed: false } as Xrm.Navigation.ConfirmResult);
      Xrm.WebApi.updateRecord = jest.fn();

      // Act
      await RequestRibbon.ApproveCommandClicked(XrmMockGenerator.getFormContext());

      // Assert
      expect(Xrm.Navigation.openConfirmDialog).toBeCalled();
      expect(Xrm.WebApi.updateRecord).not.toBeCalled();
    });

    test("approve request when confirmed", async () => {
      // Arrange
      Xrm.Navigation.openConfirmDialog = jest.fn().mockReturnValue({ confirmed: true } as Xrm.Navigation.ConfirmResult);
      const formContext = XrmMockGenerator.getFormContext();
      const recordid = "00000000-0000-0000-0000-000000000001";
      formContext.data.entity.getId = jest.fn(() => recordid);

      Xrm.Utility.showProgressIndicator = jest.fn();
      Xrm.Utility.closeProgressIndicator = jest.fn();
      Xrm.WebApi.updateRecord = jest.fn();

      // Act
      await RequestRibbon.ApproveCommandClicked(formContext);

      // Assert
      expect(Xrm.Navigation.openConfirmDialog).toBeCalled();
      expect(Xrm.WebApi.updateRecord).toBeCalledWith(
        vnug_requestMetadata.logicalName,
        recordid,
        expect.objectContaining({ statuscode: vnug_request_vnug_request_statuscode.Approved } as vnug_request),
      );
    });
  });
});
