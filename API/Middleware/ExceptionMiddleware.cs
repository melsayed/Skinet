using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddleware(IHostEnvironment env, RequestDelegate next)
    {
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (System.Exception ex)
            {
                await HandleExceptionAsync(env, context, ex);
            }
        }

        private static Task HandleExceptionAsync(IHostEnvironment env, HttpContext context, Exception ex)
        {
            context.Response.ContentType = "Application/json";
            context.Response.StatusCode = (int)StatusCodes.Status500InternalServerError;
            var Response = new APIErrorResponse(context.Response.StatusCode, ex.Message, env.IsDevelopment() ? ex.StackTrace : "Internal Server Error");

            var options = new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var json = JsonSerializer.Serialize(Response, options);
            return context.Response.WriteAsync(json);
        }
    }
}