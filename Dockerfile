FROM node:20-alpine as builder
WORKDIR /app/

COPY package.json yarn.lock ./

RUN yarn install --immutable

FROM node:20
WORKDIR /app/
COPY package.json yarn.lock  ./
COPY --from=builder /app/node_modules/ ./node_modules/
COPY . .

EXPOSE 3458

ENV NODE_ENV production
ENV PORT 3458
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}

RUN yarn build
