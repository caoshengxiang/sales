#!  /bin/bash
# && 如果前面的命令正确执行，那么后面的命令也将执行。否则后面的命令不执行。
scp dist.tar.gz root@119.23.106.240:/opt
ssh root@119.23.106.240 "rm -rf /opt/web-front/sales/bak && mkdir /opt/web-front/sales/bak && mv /opt/web-front/sales/index.html /opt/web-front/sales/static -t /opt/web-front/sales/bak/ && tar -zxvf /opt/dist.tar.gz -C /opt/web-front/sales/ && mv /opt/web-front/sales/dist/* -t /opt/web-front/sales/ && rm -rf /opt/web-front/sales/dist"

# ***
http://erp.zzcfo.cn
