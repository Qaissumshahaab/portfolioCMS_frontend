FROM node:24-alpine AS base
WORKDIR /app/frontend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build


FROM nginx:alpine
WORKDIR /app/frontend
COPY ./nginx/default.conf /etc/nginx/conf.d/
COPY --from=base /app/frontend/dist/ /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]