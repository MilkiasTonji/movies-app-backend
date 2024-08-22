FROM node:20

WORKDIR /app

COPY package*.json ./

# Install any needed packages
RUN npm install

COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Define environment variable
ENV NODE_ENV=production

# Run the app
CMD ["node", "app.js"]
