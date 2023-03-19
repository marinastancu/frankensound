using Microsoft.AspNetCore.Mvc;
using System.Text;
using RabbitMQ.Client;
using Microsoft.AspNetCore.Connections;

[Route("api/[controller]")]
[ApiController]
public class HelloWorldController : ControllerBase
{
    ConnectionFactory connectionFactory = new ConnectionFactory();

    public static void Send(string queue, string data)
    {
        using (IConnection connection = new ConnectionFactory().CreateConnection())
        {
            using (IModel channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue, false, false, false, null);
                channel.BasicPublish(string.Empty, queue, null, Encoding.UTF8.GetBytes(data));
            }
        }
    }

    // GET api/values
    [HttpGet]
    public ActionResult SendMessage()
    {
        Send("hello", "Hello World!");
        return Content( "Message has been sent in queue" );
    }
}
