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
```
version: '2'

services:
  nginx:
    extends:
      file: dc.common.yml
      service: nginx
    volumes:
      - .:/var/www
    ports:
      - '20001:8080'
```
Run these commands:
```
docker-compose -f dc.dev.yml up -d
docker exec -it -u www-data angular1bootstrap_nginx_1 bash
npm install
npm run build
```
Go to http://localhost:20001

----------

*remain free*
