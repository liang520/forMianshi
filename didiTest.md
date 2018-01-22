1. 排序算法 =>插入 快排 冒泡 用js写算法   
 [排序算法](http://blog.csdn.net/u013063153/article/details/52667542#t10)
2. '1-2/9*3' 给出结果，不能用eval  
 <code>
	
	
 function  Calculator(val){
	var item='';
	var calculate=[];
	for(var i=0,itemVal;i<val.length,itemVal=val.charAt(i);i++){
		if('+-*/'.indexOf(itemVal)>-1){
			calculate.push(Number(item),itemVal);
			item=''
		}else{
			item+=itemVal;
		}
	}
	if(item){
		calculate.push(Number(item))
		item=''
	}
	return calculate
	}
	function calculate(val){
		var ops=[{'*':(a,b)=>a*b,'/':(a,b)=>a/b},
				{'+':(a,b)=>a+b,'-':(a,b)=>a-b}];
		var newCalc=[];
		var currentOp;
		for(var i=0;i<ops.length;i++){
			for(var j=0;j<val.length;j++){
				if(ops[i][val[j]]){//如果是计算符号
					currentOp=ops[i][val[j]];//把计算赋值
				}else if(currentOp){//如果有符号
					newCalc[newCalc.length-1]=currentOp(newCalc[newCalc.length-1],val[j]);
					//如果不是符号且上一步是符号,这一步是数字，那么就把上一个数字和当前的符号和上一个数字计算出来，
					currentOp=''
				}else{
					newCalc.push(val[j]);//将数字叠如数组中
				}
			}//做完了一部级别的运算
			val=newCalc;//将上一个级别的运算的值给老数据，去计算下一个级别的运算
			newCalc=[];//将临时的计算值清空
		}
		return val[0]
	}
	var calculateArray=Calculator('1-2/9*3')
	calculate(calculateArray)
</code>  
3. 关于对象的继承  
4. 关于flex布局  
5. 写一个函数，第一次调用返回0，第二次调用返回1依次，要求不污染全局变量
6. 问了闭包、作用域  
7. 冒泡和捕获  
8. 捕获的应用场景  
9. 手写jsonp  
10. 问了csrf  
11. 用vue写一个翻页组件   
12. "qc2 dc3 cg5"按数字的顺序把字符串重排一下,从小到大
13. promise  
14. mongodb怎么优化查询  
15. html5和html4的差别  
16. 浏览器的兼容性  
17. web worker  (server worker)  
18. jquery 都能用来干啥  
19. http状态码  
20. [算法题](http://mp.weixin.qq.com/s/2DTcuFYa-ClmTGHBsZL82Q)  
21. [前端面试题-滴滴一面](http://blog.csdn.net/liuliuliu_666/article/details/78366901)  
22. [阿里、网易、滴滴共十次前端面试碰到的问题](https://segmentfault.com/a/1190000009662029)  [相关答案](https://zhoukekestar.github.io/notes/2017/06/07/interview-answers.html) 
