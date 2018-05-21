#!  /bin/bash
# && 如果前面的命令正确执行，那么后面的命令也将执行。否则后面的命令不执行。
mv dist temp && tar zcvf temp.tar.gz temp && mv temp dist && mv temp.tar.gz dist/
#scp dist/temp.tar.gz root@119.27.160.41:/opt
#ssh root@119.27.160.41 "rm -rf /opt/web-front/sales && tar -zxvf /opt/temp.tar.gz"
#ssh root@119.27.160.41 "mv temp /opt/web-front/sales"


#
