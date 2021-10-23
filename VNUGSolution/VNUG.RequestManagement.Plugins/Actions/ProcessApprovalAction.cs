using Microsoft.Xrm.Sdk;
using System;

namespace VNUG.RequestManagement.Plugins.Actions
{
    [CrmPluginRegistration("vnug_processrequestapproval", "vnug_request",
        StageEnum.PostOperation, ExecutionModeEnum.Synchronous,
        "", "PostOperation_vnug_request_Sync", 1,
        IsolationModeEnum.Sandbox
    )]
    public class ProcessApprovalAction : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            if (context.InputParameters["Target"] != null && context.InputParameters["Target"] is EntityReference)
            {
                var serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                var service = serviceFactory.CreateOrganizationService(context.UserId);

                var targetRef = (EntityReference)context.InputParameters["Target"];
                var updateTarget = new Entity(targetRef.LogicalName)
                {
                    Id = targetRef.Id,
                    ["statuscode"] = new OptionSetValue(100000001)
                };

                service.Update(updateTarget);

                context.OutputParameters["CompletedOn"] = DateTime.Now;
            }
        }
    }
}
