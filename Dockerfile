FROM ubuntu:14.04
MAINTAINER Your Name <any@example.com>

ENV APP_HOME /usr/local/app
ENV NVM_DIR /usr/local/app/.nvm
RUN mkdir -p ${APP_HOME}
WORKDIR ${APP_HOME}

RUN apt-get -qq update && apt-get install -qqy curl && rm -rf /var/lib/apt/lists

# Setup Node.js
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
RUN . ${NVM_DIR}/nvm.sh && nvm install stable

# Setup App
ADD package.json package.json
ADD app.js app.js
ADD bin bin
ADD public public
ADD routes routes
ADD views views
RUN . ${NVM_DIR}/nvm.sh && npm install --no-progress

# Run App
EXPOSE 3000/tcp
ENTRYPOINT . ${NVM_DIR}/nvm.sh && node bin/www
