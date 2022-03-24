
# Dockerfile

FROM node:15
# base image

# create & set working directory
RUN mkdir -p /usr/src/lets-cook-admin
WORKDIR /usr/src/lets-cook-admin

# copy source files
COPY . /usr/src/lets-cook-admin

# install dependencies
RUN npm install
RUN npm rebuild node-sass

# start app
# RUN npm run build
EXPOSE 3010
CMD npm run dev

