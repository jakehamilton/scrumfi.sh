FROM node:alpine

RUN mkdir -p /tmp/{frontend,backend} && \
    mkdir -p /opt/app

COPY ./frontend/package*.json /tmp/frontend/
COPY ./backend/package*.json /tmp/backend/

RUN cd /tmp/frontend && npm install && \
    cd /tmp/backend && npm install

COPY . /opt/app/

RUN cp -a /tmp/frontend/* /opt/app/frontend/ && \
    cp -a /tmp/backend/* /opt/app/backend/

WORKDIR /opt/app

ENV STATIC_DIR=/opt/static
ENV NODE_PORT=80

RUN rm -rf ./frontend/public/scripts && \
    npm run build && \
    NO_MODULE_SCRIPT="<script nomodule src=\"\\/scripts\\/bundle.js\"><\\/script>" && \
    MODULE_SCRIPT="<script type=\"module\" src=\"\\/scripts\\/bundle.modern.js\"><\\/script>" && \
    sed -i "s/<\!-- INJECT:SCRIPT -->/$NO_MODULE_SCRIPT $MODULE_SCRIPT/g" ./frontend/public/index.html && \
    mkdir -p ${STATIC_DIR} && \
    cp -a ./frontend/public/* ${STATIC_DIR}/ && \
    rm -rf ./frontend


ENTRYPOINT ["/usr/local/bin/node"]
CMD ["/opt/app/backend/src/index.js"]
