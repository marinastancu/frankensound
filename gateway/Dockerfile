# Use image
FROM openjdk:11
# Expose application port
EXPOSE 8070
# Create directory
RUN mkdir /app
# Copy files
COPY ./build/libs/*-all.jar /app/build.jar
# Start the application
ENTRYPOINT ["java","-jar","/app/build.jar"]