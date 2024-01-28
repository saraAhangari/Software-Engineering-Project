# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Build the project
RUN npm run build

# Use nginx to serve the React build
# Use nginx:stable-alpine for a lightweight production build
FROM nginx:stable-alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Define environment variable
# ENV NAME Value

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
