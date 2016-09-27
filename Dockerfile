
FROM teego/node:latest

MAINTAINER Aleksandr Zykov <tiger@vilijavis.lt>

ENV NODE_ENV production

ENV BUILDBASE /r

ADD . $BUILDBASE/app

RUN ( \
        npm install -g \
            sequelize-cli \
            babel-cli \
    )

RUN cd $BUILDBASE/app &&\
    ( \
        npm install --no-optional --no-shrinkwrap &&\
        npm run build \
    )

ENV PORT 3000

EXPOSE 3000

VOLUME ["$BUILDBASE/app/config"]

CMD ["npm", "run", "prod"]