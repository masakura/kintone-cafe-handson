FROM node:6
ENV APP_HOME /app

WORKDIR ${APP_HOME}
ADD package.json package.json
RUN npm install --no-progress && rm -rf /root/.npm
ADD app.js app.js
ADD bin bin
ADD libs libs
ADD public public
ADD routes routes
ADD views views

EXPOSE 3000/tcp
ENTRYPOINT npm start
