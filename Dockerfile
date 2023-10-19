FROM node:16.20 as build
WORKDIR /usr/src/app

COPY package*.json ./
COPY .npmrc ./
RUN npm install
RUN rm -f .npmrc

COPY . .

RUN npm run build

FROM nginx:1.23.3-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]
