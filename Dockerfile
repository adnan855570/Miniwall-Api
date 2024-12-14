# Base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files to the container
COPY . .

# Expose the port the app runs on
EXPOSE 2000

# Command to run the application
CMD ["node", "app.js"]
