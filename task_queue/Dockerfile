FROM node:18 as base

WORKDIR /src
COPY package*.json /
COPY tsconfig.json /
CMD ["npm", "run", "build"]

FROM base as development
ENV NODE_ENV=development
RUN npm ci
COPY . /
CMD ["npm", "run", "dev"]