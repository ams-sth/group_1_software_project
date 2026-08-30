using Microsoft.AspNetCore.Mvc;
using SplitSync.Api.Controllers;

namespace SplitSync.Api.Tests.Controllers;

public class HealthControllerTests
{
    [Fact]
    public void Get_ReturnsOkWithStatusOk()
    {
        var controller = new HealthController();

        var result = controller.Get();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsAssignableFrom<object>(okResult.Value);
        var status = value.GetType().GetProperty("status")?.GetValue(value);
        Assert.Equal("ok", status);
    }
}
