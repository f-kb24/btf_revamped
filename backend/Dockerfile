FROM node:18 as base

WORKDIR /src
COPY package*.json /
COPY tsconfig.json /
CMD ["npm", "run", "build"]

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["npm", "run", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . /
CMD ["npm", "run", "dev"]