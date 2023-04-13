FROM nginx

MAINTAINER trotroisgoodboy  # 定义作者

RUN rm /etc/nginx/conf.d/default.conf # 移除基础镜像内部的nginx的默认配置文件

WORKDIR /app

WORKDIR /app/images

ADD default.conf /etc/nginx/conf.d/

COPY dist/ /usr/share/nginx/html/
