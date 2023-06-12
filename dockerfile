# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /crm-api/src

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which your API listens
EXPOSE 8085

# Set the command to run your API
CMD [ "npm", "start" ]
