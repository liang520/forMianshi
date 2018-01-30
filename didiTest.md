1. 排序算法 =>插入 快排 冒泡 用js写算法   
 [排序算法](https://github.com/damonare/Sorts)
* 快排
```javascript
    function quickSort(arr){//快排
        if(arr.length<=1){//快排只有一个值的时候
            return arr;//返回
        }
        var pivotIndex=Math.floor(arr.length/2);//取出中间基准位置
        var pivot=arr.splice(pivotIndex,1)[0];//取出基准值，需要剔除基准值，循环迭代
        var left=[];
        var right=[];//建立左右两个存储位置
        for(var i=0;i<arr.length;i++){//遍历剩下的数据
            if(arr[i]<pivot){//小于基准值放在左边
                left.push(arr[i])
            }else{//大于基准值放在右边
                right.push(arr[i])
            }
        }
        return	quickSort(left).concat([pivot],quickSort(right));
        //递归迭代并连接所有数字
    }
    var arr=[85, 24, 63, 45, 17, 31, 96, 50];
    quickSort(arr)
```    
* 冒泡
```javascript
    function bubbleSort(arr){
        var i=arr.length-1;//初始时，倒数第二遍的时候就已经迭代完成了，所以不需要再迭代
        while(i>0){
            var pos=0;//记录下标识位置
            for(var j=0;j<i;j++){//迭代还没有冒泡的数据
                if(arr[j]>arr[j+1]){//前一个数据大于下一个数据时
                  pos=j;//记录下切换了的标识
                  var tmp=arr[j];
                  arr[j]=arr[j+1]
                  arr[j+1]=tmp;//切换数字
                }
            }
            i=pos;//更新这次迭代改变位置，下一次不再触发
        }
        return arr
    }
```
* 插入
```javascript
    function insertSort(arr){
        for(var i=1;i<arr.length;i++){//第一个不循环
            var key=arr[i];//选好要去插入的数字
            var j=i-1;//选中的值的上一位的序号
            while(j>=0&&arr[j]>key){//序号大于零且上一个值比选中插入的值要大
                arr[j+1]=arr[j];//向后迭代一位
                j--;//插入的值向前走一位
            }
            arr[j+1]=key;
        }
        return arr
    }
```
* 选择
```javascript
    function selection(arr){
        var len=arr.length;
        var minIndex,temp;
        for(var i=0;i<len-1;i++){//最后一个不用对比
            minIndex=i;//默认循环的拉一个是
            for(var j=i+1;j<len;j++){
                if(arr[minIndex]>arr[j]){//选中的值 大于后面迭代的值
                    minIndex=j;//最小值序号更新；不更新值，拿当前最小的值序号继续往后迭代，迭代出所有后面的最小的一个值；
                }
            }
            temp=arr[i];
            arr[i]=arr[minIndex];//最小值赋值给当前的迭代起始位
            arr[minIndex]=temp
        }
        return arr
    }
```
2. '1-2/9*3' 给出结果，不能用eval  
**无括弧**
```javascript
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
``` 
**有无括弧都可以**
```javascript
    var a=new Function('return 1-2/9*3')
``` 
**有无括弧都可以**
```javascript
    var s = "1 - 2 / 9 * 3";
    setTimeout("console.log(" + s + ")");
``` 
**有无括弧都可以**
```javascript
    "use strict";
class Calculation {
    constructor() {
        this._symbols = {};
        this.defineOperator("!", this.factorial,      "postfix", 6);
        this.defineOperator("^", Math.pow,            "infix",   5, true);
        this.defineOperator("*", this.multiplication, "infix",   4);
        this.defineOperator("/", this.division,       "infix",   4);
        this.defineOperator("+", this.last,           "prefix",  3);
        this.defineOperator("-", this.negation,       "prefix",  3);
        this.defineOperator("+", this.addition,       "infix",   2);
        this.defineOperator("-", this.subtraction,    "infix",   2);
        this.defineOperator(",", Array.of,            "infix",   1);
        this.defineOperator("(", this.last,           "prefix");
        this.defineOperator(")", null,                "postfix");
        this.defineOperator("min", Math.min);
        this.defineOperator("sqrt", Math.sqrt);
    }
    // Method allowing to extend an instance with more operators and functions:
    defineOperator(symbol, f, notation = "func", precedence = 0, rightToLeft = false) {
        // Store operators keyed by their symbol/name. Some symbols may represent
        // different usages: e.g. "-" can be unary or binary, so they are also
        // keyed by their notation (prefix, infix, postfix, func):
        if (notation === "func") precedence = 0;
        this._symbols[symbol] = Object.assign({}, this._symbols[symbol], {
            [notation]: {
                symbol, f, notation, precedence, rightToLeft, 
                argCount: 1 + (notation === "infix")
            },
            symbol,
            regSymbol: symbol.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&')
                + (/\w$/.test(symbol) ? "\\b" : "") // add a break if it's a name 
        });
    }
    last(...a)           { return a[a.length-1] }
    negation(a)          { return -a }
    addition(a, b)       { return a + b }
    subtraction(a, b)    { return a - b }
    multiplication(a, b) { return a * b }
    division(a, b)       { return a / b }
    factorial(a) {
        if (a%1 || !(+a>=0)) return NaN
        if (a > 170) return Infinity;
        let b = 1;
        while (a > 1) b *= a--;
        return b;
    }
    calculate(expression) {
        let match;
        const values = [],
            operators = [this._symbols["("].prefix],
            exec = _ => {
                let op = operators.pop();
                values.push(op.f(...[].concat(...values.splice(-op.argCount))));
                return op.precedence;
            },
            error = msg => {
                let notation = match ? match.index : expression.length;
                return `${msg} at ${notation}:\n${expression}\n${' '.repeat(notation)}^`;
            },
            pattern = new RegExp(
                // Pattern for numbers
                "\\d+(?:\\.\\d+)?|" 
                // ...and patterns for individual operators/function names
                + Object.values(this._symbols)
                        // longer symbols should be listed first
                        .sort( (a, b) => b.symbol.length - a.symbol.length ) 
                        .map( val => val.regSymbol ).join('|')
                + "|(\\S)", "g"
            );
        let afterValue = false;
        pattern.lastIndex = 0; // Reset regular expression object
        do {
            match = pattern.exec(expression);
            const [token, bad] = match || [")", undefined],
                notNumber = this._symbols[token],
                notNewValue = notNumber && !notNumber.prefix && !notNumber.func,
                notAfterValue = !notNumber || !notNumber.postfix && !notNumber.infix;
            // Check for syntax errors:
            if (bad || (afterValue ? notAfterValue : notNewValue)) return error("Syntax error");
            if (afterValue) {
                // We either have an infix or postfix operator (they should be mutually exclusive)
                const curr = notNumber.postfix || notNumber.infix;
                do {
                    const prev = operators[operators.length-1];
                    if (((curr.precedence - prev.precedence) || prev.rightToLeft) > 0) break; 
                    // Apply previous operator, since it has precedence over current one
                } while (exec()); // Exit loop after executing an opening parenthesis or function
                afterValue = curr.notation === "postfix";
                if (curr.symbol !== ")") {
                    operators.push(curr);
                    // Postfix always has precedence over any operator that follows after it
                    if (afterValue) exec();
                }
            } else if (notNumber) { // prefix operator or function
                operators.push(notNumber.prefix || notNumber.func);
                if (notNumber.func) { // Require an opening parenthesis
                    match = pattern.exec(expression);
                    if (!match || match[0] !== "(") return error("Function needs parentheses")
                }
            } else { // number
                values.push(+token);
                afterValue = true;
            }
        } while (match && operators.length);
        return operators.length ? error("Missing closing parenthesis")
                : match ? error("Too many closing parentheses")
                : values.pop() // All done!
    }
}
Calculation = new Calculation(); // Create a singleton

// I/O handling
function perform() {
    const expr = document.getElementById('expr').value,
        result = Calculation.calculate(expr);
    document.getElementById('out').textContent = isNaN(result) ? result : '=' + result;
}
document.getElementById('expr').addEventListener('input', perform);
perform();

// Tests
const tests = [
    { expr: '1+2', expected: 3 },
    { expr: '1+2*3', expected: 7 },
    { expr: '1+2*3^2', expected: 19 },
    { expr: '1+2*2^3^2', expected: 1025 },
    { expr: '-3!', expected: -6 },
    { expr: '12---11+1-3', expected: -1 },
    { expr: 'min(2,1,3)', expected: 1 },
    { expr: '(2,1,3)', expected: 3 },
    { expr: '4-min(sqrt(2+2*7),9,5)', expected: 0 },
    { expr: '2,3,10', expected: 10 }
]

for (let {expr, expected} of tests) {
    let result = Calculation.calculate(expr);
    console.assert(result === expected, `${expr} should be ${expected}, but gives ${result}`);
}
```
```html
<input id="expr" value="min(-1,0)+((sqrt(16)+(-4+7)!*---4)/2)^2^3"><p>
<pre id="out"></pre>
```

3. [关于对象的继承](https://div.io/topic/941)
4. 关于flex布局  
5. 写一个函数，第一次调用返回0，第二次调用返回1依次，要求不污染全局变量   
```javascript
var b=(function(){
        var a=0;
        return function addOne(){
            return a++;//先返回，再计算，调用依次返回0、1、2
        } 
    })();
```
6. 问了闭包、作用域  
7. 冒泡和捕获、委托、传播   
    DOM事件流（event  flow ）存在三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。  
    <b>先捕获后冒泡</b>  
    preventDefault阻止事件的默认行为、returnValue属性为false来阻止事件的默认行为  
    stopPropagation阻止冒泡、cancelBubble
8. 捕获的应用场景  
    “非冒泡事件的事件代理”  
    div(d1)->div(d2)  
    d1被点击时执行业务a；  
    d2被点击时执行业务b；  
    b的执行结果可能影响到a的执行上下文；  
    a的执行结果也有可能影响到b的执行上下文；  
    scroll/resize 这类可能连续触发的事件不冒泡的原因（避免冒泡阶段的事件传播开销）
9. 手写jsonp  
```javascript
    // 得到航班信息查询结果后的回调函数
    var flightHandler = function(data){
        alert('你查询的航班结果是：票价 ' + data.price + ' 元，' + '余票 ' + data.tickets + ' 张。');
    };
    // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
    var url = "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998&callback=flightHandler";
    // 创建script标签，设置其属性
    var script = document.createElement('script');
    script.setAttribute('src', url);
    // 把script标签加入head，此时调用开始
    document.getElementsByTagName('head')[0].appendChild(script); 
```
10. 问了[csrf](http://blog.csdn.net/stpeace/article/details/53512283)跨站点请求伪造、[xss](http://blog.csdn.net/ghsau/article/details/17027893)跨站脚本攻击  
11. 用vue写一个翻页组件   
12. "qc2 dc3 cg5"按数字的顺序把字符串重排一下,从小到大    
```javascript
    //Array.sort();
    ['qc2','cag5','c3','qw4'].sort(function(a,b){
        return a.charAt(a.length-1)>b.charAt(b.length-1)
    })
```
13. promise  
14. mongodb怎么优化查询  
15. [html5和html4的差别](https://segmentfault.com/a/1190000002453884#articleHeader20)
16. [浏览器的兼容性](https://zhuanlan.zhihu.com/p/25123086?refer=dreawer)  
17. [web worker](https://zhuanlan.zhihu.com/p/27264234)  [(server worker)](https://developers.google.com/web/fundamentals/primers/service-workers/)   
18. jquery 都能用来干啥  
19. http状态码  
20. [算法题](http://mp.weixin.qq.com/s/2DTcuFYa-ClmTGHBsZL82Q)  
21. [前端面试题-滴滴一面](http://blog.csdn.net/liuliuliu_666/article/details/78366901)  
22. [阿里、网易、滴滴共十次前端面试碰到的问题](https://segmentfault.com/a/1190000009662029)  [相关答案](https://zhoukekestar.github.io/notes/2017/06/07/interview-answers.html) 
23. 判断是数组的方法  
24. babel原理
25. [webpack tree-shaking原理](https://zhuanlan.zhihu.com/p/32554436?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com)
26. 0.1+0.2!=0.3为什么  
27. BFC 是什么  
28. Array的一些方法  
```javascript
    Array.sort()//排序
    Array.reduce();//累加
    //callback
    // 执行数组中每个值的函数，包含四个参数：
    // accumulator
    // 累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（如下所示）。
    // currentValue
    // 数组中正在处理的元素。
    // currentIndex
    // 数组中正在处理的当前元素的索引。 如果提供了initialValue，则索引号为0，否则为索引为1。
    // array
    // 调用reduce的数组
    // initialValue
    // [可选] 用作第一个调用 callback的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
    Array.some();
    Array.every();//不能改变原数组
```
29. argument、callee、caller
30. apply()是函数对象的一个方法，它的作用是<b>改变函数的调用对象</b>，它的第一个参数就表示改变后的<b>调用这个函数的对象</b>
31. 缓存相关，localstorage、indexDB、cookie、session   
32. [css相关](http://blog.csdn.net/VhWfR2u02Q/article/details/78948683?from=timeline)

