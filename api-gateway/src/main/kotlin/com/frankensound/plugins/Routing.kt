package com.frankensound.plugins

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.plugins.autohead.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.client.request.*
import io.ktor.client.statement.*

fun Application.configureRouting() {
    install(AutoHeadResponse)
    install(StatusPages) {
        exception<Throwable> { call, cause ->
            call.respondText(text = "500: $cause", status = HttpStatusCode.InternalServerError)
        }
    }
    routing {
        val client = HttpClient(CIO)
        get("/") {
            val response: HttpResponse = client.get("http://host.docker.internal:8080/")
            println(response.status)
            call.respondText("Hello World!")
            //client.close()

        }
    }
}
