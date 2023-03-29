package com.frankensound

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.frankensound.plugins.*

fun main() {
    embeddedServer(Netty, port = 8070, module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    configureSecurity()
    configureRouting()
}
