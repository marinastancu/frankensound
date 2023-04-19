package com.frankensound.plugins

import com.frankensound.getObject
import com.frankensound.listBucketObs
import io.github.oshai.KotlinLogging
import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*

const val bucketName = "frankensound"

fun Application.configureRouting() {
    val logger = KotlinLogging.logger {}

    install(StatusPages) {
        exception<Throwable> { call, cause ->
            call.respondText(text = "500: $cause", status = HttpStatusCode.InternalServerError)
        }
    }
    routing {
        val client = HttpClient(CIO)

        // Return a list of songs
        get("/songs") {
            logger.info { "Returned songs" }
            call.respondText(listBucketObs(bucketName).toString())
        }

        // Play a song
        get("/songs/play/{title}") {
            val key: String = call.parameters["title"].toString()
            val path: String = "temp/$key"

            if (key != null) {
                getObject(bucketName, key, path)

                call.response.status(HttpStatusCode.OK)
            } else {
                call.response.status(HttpStatusCode.BadRequest)
            }
        }

        //Return play history of user
        get("/profile/history") {
            val response: HttpResponse = client.get("http://host.docker.internal:8090")

            if (response.status.value in 200..299) {
                call.response.status(HttpStatusCode.OK)
            }
            call.respondText(response.body())
        }
        //Return recommendation made for user
        get("profile/recommendations") {
            //TODO: Implement recommendations endpoint
        }
    }
}
