using Microsoft.AspNetCore.Mvc;
namespace API.AddControllers;

[Route("api/[controller]")]
[ApiController]
public class WeatherController : ControllerBase
{
    public WeatherController()
    {

    }


    [HttpGet]
    public ActionResult<IEnumerable<WeatherForecast>> getWeather()
    {
        var summaries = new[]
            {
                "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
            };
        var forecast = Enumerable.Range(1, 5).Select(index =>
                new WeatherForecast
                (
                    DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    Random.Shared.Next(-20, 55),
                    summaries[Random.Shared.Next(summaries.Length)]
                ))
                .ToArray();
        return Ok(forecast);
    }
}
public record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
