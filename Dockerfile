# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.16.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="NodeJS"

# NodeJS app lives here
WORKDIR /app

RUN apt-get update && apt-get install -y git && apt-get clean

# Set production environment
ENV NODE_ENV=production
ARG YARN_VERSION=latest
RUN npm install -g yarn@$YARN_VERSION --force


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential 

# Install node modules
COPY --link package.json yarn.lock .
RUN yarn install --production=false

# Copy application code
COPY --link . .

# Remove development dependencies
RUN yarn install --production=true


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
CMD [ "yarn", "run", "start" ]
