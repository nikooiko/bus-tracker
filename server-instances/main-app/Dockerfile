FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Add our user and group first to make sure their IDs get assigned consistently
RUN groupadd -r app && \
    useradd -r -g app app && \
    mkdir /home/app && \
    chown app:app /home/app && \
    chown app:app /usr/src/app
USER app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Transfer app code
COPY . /usr/src/app

# Give accces to our app user in app directory with files now
USER root
RUN chown -R app:app /usr/src/app
USER app

# Set Node environment to production
ENV NODE_ENV production

# Build frontend resources
RUN npm run build-front

# Mark web service port exposed
EXPOSE 3000

CMD ["npm", "start"]

