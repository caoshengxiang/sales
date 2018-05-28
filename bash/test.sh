#!  /bin/bash
# && 如果前面的命令正确执行，那么后面的命令也将执行。否则后面的命令不执行。
mv dist sales && tar zcvf sales.tar.gz sales && mv sales dist && mv sales.tar.gz dist/
scp dist/sales.tar.gz root@119.27.160.41:/opt
ssh root@119.27.160.41 "rm -rf /opt/web-front/sales && tar -zxvf /opt/sales.tar.gz -C /opt/web-front"
rm -rf dist

# daydayUP@2017
# http://sales.dcstar-inc.com/#/
