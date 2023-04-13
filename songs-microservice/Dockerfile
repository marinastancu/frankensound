# Use Node 16 alpine as parent image
FROM node:16-alpine
# Change the working directory on the Docker image to /usr/src/src
WORKDIR /usr/src/app
# Copy package.json and package-lock.json
COPY package.json package-lock.json ./
# Install dependencies
RUN npm install
# Copy the rest of project files into this image
COPY . .
# Expose application port
EXPOSE 8060
# Start the application
CMD [ "node", "server.js" ]