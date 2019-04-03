/*
nhttpc的作用是，模拟请求数据，下载文件，上传文件
规则是不允许参数重复
-u 表示为账号
-p 表示为密码
-P 表示为端口
-q 表示请求方式 支持 OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE和CONNECT
   大小写都可以，使用时会进行转换为大写
-data 表示要传递的参数 支持string，json，xml等格式的数据与-h 配合使用
-h Or -header 接收一个json的key与value结构的对象 {"key":"value"}
-help 帮助说明

未完待续
*/
const arguments = Array.prototype.slice.call(process.argv, 2);
// 去掉node 与 index.js 
const options = {};
const optionsKeys = [];
const optionsValues = [];
for (let i = 0; i < arguments.length; i += 1) {
  const k = arguments[i];
  if (k === '-s') {
    optionsKeys.push(k);
    optionsValues.push(k);
    continue;
  }

  if (i % 2 === 0) {
    optionsKeys.push(k);
  } else {
    optionsValues.push(k);
  }
}

const error = ["error options repeat", "error parameters number"];

for (let i = 0; i < optionsKeys.length; i += 1)  {
    const key = optionsKeys.filter((item)=>{
	return item === optionsKeys[i] || 
        item.substr(0, 2) === optionsKeys[i].substr(0 ,2);
    });
    if (key.length > 1) {
	console.error(error[0]);
	return false;
    }
}

if (optionsKeys.length === optionsValues.length) {
  for (let i = 0; i < optionsKeys.length; i += 1) {
	console.log(optionsKeys[i], optionsValues[i]);
	options[optionsKeys[i]] = optionsValues[i];
  }
} else {
  console.error(error[1]);
  return false;
}

console.log("所传参数是:", options);

function requireHTTP(url, options, httpRequire) {
  const req = httpRequire.request(url, options, (res) => {
	res.setEncoding('utf8');

        res.on('data', (chunk) => {
	  console.log(chunk);
        });
	res.on('end', ()=>{ 
 	  console.log('==========end==========')
        });
  });
  req.on('error', (e) => {
    console.log('error', e.message);
  });
  req.end();
}


if (options['-s']) {
  const https = require('https');
  const o = options;
  requireHTTP(o.url, {}, https);
} else {
  const http = require('http');
  const o = options;
  requireHTTP(o.url, {}, http);
}









