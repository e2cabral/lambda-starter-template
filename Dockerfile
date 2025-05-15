FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN rm -rf src/*.ts node_modules && npm install --omit=dev

FROM public.ecr.aws/lambda/nodejs:20
WORKDIR /var/task
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
