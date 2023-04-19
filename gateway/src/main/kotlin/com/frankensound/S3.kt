package com.frankensound

import aws.sdk.kotlin.services.s3.S3Client
import aws.sdk.kotlin.services.s3.model.GetObjectRequest
import aws.sdk.kotlin.services.s3.model.ListObjectsRequest
import aws.smithy.kotlin.runtime.content.writeToFile
import java.io.File

val client = S3Client { region = "eu-north-1" }

suspend fun getObject(bucketName: String, keyName: String, path: String) {
    val request = GetObjectRequest {
        key = keyName
        bucket = bucketName
    }
    client.use { s3 ->
        s3.getObject(request) { resp ->
            val myFile = File(path)
            resp.body?.writeToFile(myFile)
            println("Successfully read $keyName from $bucketName")
        }
    }
}

suspend fun listBucketObs(bucketName: String): ArrayList<String> {
    val list = ArrayList<String>()
    val request = ListObjectsRequest {
        bucket = bucketName
    }
    client.use { s3 ->
        val response = s3.listObjects(request)
        response.contents?.forEach { myObject ->
            list.add(myObject.key.toString())
        }
    }
    return list
}
