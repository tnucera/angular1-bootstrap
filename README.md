AngularJS + Boostrap example
-------------

npm only (dependencies + build)

no bower, no grunt, no gulp...

**Commands:**
```
npm run build      # [prod] compile & copy
npm run dev:build  # [dev]  compile & symlink & inject
npm run dev:inject # [dev]  inject file references into index.html
npm run dev:watch  # [dev]  watch
npm run dev:serve  # [dev]  watch & serve with browser-sync
```

**Dev:**

Create *dc.dev.yml*:
``` yaml
version: '2'

services:
  nginx:
    extends:
      file: dc.common.yml
      service: nginx
    build:
      args:
        GID: 1000 # use linux 'id' command to check this value
        UID: 1000 # use linux id command to check this value
        TZ: Europe/Paris
        PROXY: null
        NO_PROXY: null
    volumes:
      - .:/var/www
    ports:
      - '20000:8080'
      - '20001:3000'
```
Run these commands:
```
docker-compose -f dc.dev.yml up -d
docker exec -it -u www-data angular1bootstrap_nginx_1 bash
npm install
npm run build
```
Go to http://localhost:20000 (nginx)
Go to http://localhost:20001 (browser-sync with npm run dev:serve)

----------

*remain free*
