FROM node:18.18.2-alpine as builder
WORKDIR /app/

COPY package.json yarn.lock ./

RUN yarn install --immutable

FROM node:18.18.2
WORKDIR /app/
COPY package.json yarn.lock  ./
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder --chown=nextjs:nodejs /app/.next/server/edge-chunks ./.next/server/edge-chunks
COPY . .

EXPOSE 3458

ENV NODE_ENV production
ENV PORT 3458
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ARG DATABASE_URL
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
ENV DATABASE_URL=${DATABASE_URL}
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

RUN yarn generate:prisma
RUN yarn build
