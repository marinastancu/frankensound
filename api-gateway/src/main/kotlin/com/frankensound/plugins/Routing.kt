package com.frankensound.plugins

import io.ktor.client.*
import io.ktor.client.call.*
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
        //Return play link for a song
        //NOTE: This is to prevent double bandwidth usage with streaming audio
        get("/play/{title}") {
            val title = call.parameters["title"]
            val url = "http://host.docker.internal:8060/songs/"

            if (title != null) {
                call.response.status(HttpStatusCode.OK)
                call.respondText(url + title)
            } else {
                call.response.status(HttpStatusCode.BadRequest)
            }
        }
        //Return history of user
        get("/profile/history") {
            val response: HttpResponse = client.get("http://host.docker.internal:8090")

            if (response.status.value in 200..299) {
                call.response.status(HttpStatusCode.OK)
            }
            call.respondText(response.body())
        }
        //Return recommendation made for user
        //TODO
    }
}
