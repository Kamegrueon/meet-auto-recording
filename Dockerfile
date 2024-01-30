FROM node:16.13.0-bullseye-slim

WORKDIR /work
COPY ./ ./
RUN npm install