package com.frankensound

import aws.sdk.kotlin.services.s3.S3Client
import aws.sdk.kotlin.services.s3.headObject
import aws.sdk.kotlin.services.s3.model.GetObjectRequest
import aws.sdk.kotlin.services.s3.model.ListObjectsRequest
import aws.smithy.kotlin.runtime.content.toByteArray
import aws.smithy.kotlin.runtime.content.writeToFile
import java.io.File

val client = S3Client { region = "eu-north-1" }

suspend fun getObject(bucketName: String, keyName: String, path: String): ByteArray? {
    val request = GetObjectRequest {
        key = keyName
        bucket = bucketName
    }

    val stream = client.getObject(request) { resp ->
        resp.body?.toByteArray()
    }

    return stream
}

suspend fun listBucketObs(bucketName: String): ArrayList<String> {
    val list = ArrayList<String>()
    val request = ListObjectsRequest {
        bucket = bucketName
    }
    val response = client.listObjects(request)
    response.contents?.forEach { myObject ->
        list.add(myObject.key.toString())
    }
    return list
}
