FROM openjdk:11
EXPOSE 8070
RUN mkdir /app
COPY ./build/libs/*-all.jar /app/build.jar
ENTRYPOINT ["java","-jar","/app/build.jar"]