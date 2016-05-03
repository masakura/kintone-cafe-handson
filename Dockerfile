FROM ubuntu:14.04
MAINTAINER Your Name <any@example.com>

ENV APP_HOME /usr/local/app
ENV NVM_DIR /usr/local/app/.nvm

RUN apt-get -qq update && apt-get install -qqy curl && rm -rf /var/lib/apt/lists

# Setup Node.js
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
RUN . ${NVM_DIR}/nvm.sh && nvm install stable

# Setup App
RUN mkdir -p ${APP_HOME}
ADD package.json ${APP_HOME}/package.json
ADD app.js ${APP_HOME}/app.js
ADD bin ${APP_HOME}/bin
ADD public ${APP_HOME}/public
ADD routes ${APP_HOME}/routes
ADD views ${APP_HOME}/views
RUN . ${NVM_DIR}/nvm.sh && cd ${APP_HOME} && npm install --no-progress

# Run App
EXPOSE 3000/tcp
ENTRYPOINT ["/usr/local/app/bin/run.sh"]
