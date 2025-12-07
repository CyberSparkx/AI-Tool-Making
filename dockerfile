# Use the official Node.js 18 image as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install the project dependencies
RUN npm install
# Copy the rest of the application code to the working directory
COPY . .
# Expose port 3000 for the application
EXPOSE 3000
# Start the application
CMD ["npm", "start"]
