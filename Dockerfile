# Production Dependencies
FROM node:18.16.0 as dependencies
WORKDIR /dependencies

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN yarn global add pnpm

RUN pnpm install --prod --frozen-lockfile

# Production Build
FROM node:18.16.0 as build
WORKDIR /build

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN yarn global add pnpm

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# Application
FROM node:18.16.0 as application

RUN yarn global add pnpm

# Copy production dependencies
COPY --from=dependencies /dependencies/package.json ./package.json
COPY --from=dependencies /dependencies/node_modules ./node_modules

# Copy built application code
COPY --from=build /build/build ./build
COPY --from=build /build/public ./public

COPY ./server.js ./server.js

ENTRYPOINT [ "pnpm", "start" ]
