***

Installation and Use
==
在运行项目之前先确保本机已有[nodejs](https://nodejs.org/en)和[Mysql](https://dev.mysql.com/doc/refman/5.7/en/installing.html).


然后通过cmd输入<br/>
<code>$ git clone https://github.com/lQUI/express</code><br/>
<code>$ cd express </code><br/>
<code>$ npm install</code><br/>
<code>$ cp configs/mysql.conf.template configs/mysql.conf ##在生成mysql.conf文件中填写数据库的连接信息</code><br/>
<code>$ ./insert_example_data.sql.sh   ##导入该练习需要的样本数据</code><br/>


然后,需要修改[app.js](https://github.com/lQUI/express/blob/master/app.js)里的mysql连接配置信息.

然后启动运行
<code>$ node app.js</code><br/>

***

Finished
==

完成[文档](https://shimo.im/doc/jMyLTKOtyRobZFcB?r=XY7NO9/#magicdomid96)中的任务

定义Routes文件在[app.js](https://github.com/lQUI/express/blob/master/app.js)
 

#3.1 Basic Parameterized Http Route<br/>
操作步骤：浏览器输入[http://localhost:3000/v3/test-api](http://localhost:3000/v3/test-api),如果没显示任何错误信息，则说明已成功访问到。<br/>


#3.2 Basic Query in Request<br/>
操作步骤：浏览器输入[http://localhost:3000/v3/plus?a=3&b=4](http://localhost:3000/v3/plus?a=3&b=4)，如果访问成功，浏览器会接受到json字符串：'{ret: 1000, version: 3, action: plus, result: 7}'。<br/>


#3.3 URLEncoded Form in Request<br/>
操作步骤：浏览器输入[http://localhost:3000/static/index.html](http://localhost:3000/static/index.html)，然后显示一个表单，填写表单后，点击’submit'按钮提交表单，如果提交成功，浏览器会接受到json字符串：'{ret: 1000, version: 3, action: plus, result: 7}'。<br/>


#3.4  Html Template Engine Practice<br/>
操作步骤：浏览器输入[http://localhost:3000/v3/tutorial/student/list](http://localhost:3000/v3/tutorial/student/list)，然后显示一个student的表格。<br/>


#3.5 Logging to Multiple Files Differentiated by Levels<br/>
操作步骤：浏览器输入[http://localhost:3000/static/index.html](http://localhost:3000/v3#ltmfdbl)将会打开页面，然后选择需要记录的日志的用户名和日志的级别，点击'add'按钮，将会在该目录下生成cheese.log，而且该文件会记录下此次访问的时间，日志的级别和输出信息'WOW!!!'。


#3.6 Hiding Your Authentication Protected Service behind AuthMiddleware<br/>
实现过程:该例子中并没有提供登陆的实现,这里主要根据用户拿到intAuthToken和id通过[app.js](https://github.com/lQUI/express/blob/master/app.js)进行判断,首先根据intAuthToken去token表查询是否有数据,如果有在判断查到的数据里的id是否与request提供的id一致,若一致说明已经登陆了.<br/>
操作步骤:浏览器输入[http://localhost:3000/sp100029/wallet/self/detail?intAuthToken=xxxyyyzz](http://localhost:3000/sp100029/wallet/self/detail?intAuthToken=xxxyyyzz),则会显示'Welcome "iphone6" user from "192.168.1.88"!',
如果输入的是[http://localhost:3000/sp100029/wallet/self/detail](http://localhost:3000/sp100029/wallet/self/detail),则显示'{"ret":1001}';<br/>

#3.7 Automate Your Documentation<br/>
在接下来的执行,可能需要你本机装有[apidoc](http://apidocjs.com/index.html#install)
输入一下指令会在项目目录下生成doc文件夹,该apidoc只描述了3.1~3.2的api</br>.
<code>$ apidoc  -f "app\\.js$"</code>



