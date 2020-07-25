FROM node:12.18.0-alpine3.11

# Copy app source
COPY . /backend

# Set work directory to /www
WORKDIR /backend

# set env variables
ENV DATABASE_URL postgres://typeormtest:password@localhost:5432/postgres
ENV APP_NAME HydroPortfolio!
ENV NODE_ENV production
ENV PORT 8090

# Install dependencies & build
RUN cd /backend
RUN npm install
RUN npm run build

# expose the port to outside world
EXPOSE 8090

CMD ["node", "dist/main"]