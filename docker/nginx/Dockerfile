FROM debian:8

# Bash color
ENV TERM xterm
# Let the container know that there is no tty
ENV DEBIAN_FRONTEND noninteractive

# Env args
ARG TZ
ENV TZ $TZ

# Proxy
ARG PROXY
ARG NO_PROXY
ENV http_proxy $PROXY
ENV https_proxy $PROXY
ENV ftp_proxy $PROXY
ENV no_proxy $NO_PROXY

# Update system
RUN apt-get update

# Essential install
RUN apt-get install -qqy apt-transport-https ca-certificates software-properties-common python-software-properties iptables net-tools telnet curl wget htop supervisor unzip xz-utils nano vim

# Locale
RUN apt-get install -qqy locales
RUN echo 'en_US.UTF-8 UTF-8' >> /etc/locale.gen \
    && locale-gen \
    && dpkg-reconfigure locales
ENV LANGUAGE en_US:en
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8
ENV LC_CTYPE en_US.UTF-8
RUN echo $TZ > /etc/timezone \
    && dpkg-reconfigure -f noninteractive tzdata
RUN locale \
    && date

# Nginx install
RUN apt-get install -qqy nginx
ARG GID
ARG UID
RUN groupmod -g $GID www-data \
    && usermod -s /bin/bash -u $UID www-data
RUN rm -rf /var/www/* \
    && chown -R www-data:www-data /var/www/

# Node install
RUN wget -nv http://nodejs.org/dist/v4.5.0/node-v4.5.0-linux-x64.tar.xz -O /tmp/node.tar.xz \
    && mkdir -p /usr/local/node \
    && chown -R www-data:www-data /usr/local/node \
    && tar xf /tmp/node.tar.xz --strip-components=1 -C /usr/local/node
ENV PATH $PATH:/usr/local/node/bin

# Clean
RUN apt-get clean \
    && rm -rf /tmp/* /var/tmp/*

# Define working directory
WORKDIR /var/www

# Expose Ports
EXPOSE 8080 3000

# .bashrc conf
COPY docker/nginx/.bashrc /etc/.bashrc
RUN cat /etc/.bashrc >> /etc/bash.bashrc

# Nginx conf
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf

# Node conf
RUN npm completion >> /etc/bash.bashrc
ENV PATH $PATH:/var/www/node_modules/.bin

# Supervisor conf
RUN mkdir -p /var/run/supervisor/ \
    && mkdir -p /var/log/supervisor/
COPY docker/nginx/supervisord.conf /etc/supervisord.conf
COPY docker/nginx/supervisord.d/*.conf /etc/supervisord.d/

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
