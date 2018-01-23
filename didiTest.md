1. 排序算法 =>插入 快排 冒泡 用js写算法   
 [排序算法](https://github.com/damonare/Sorts)
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
23. 判断是数组的方法  
24. babel原理
25. [webpack tree-shaking原理](https://zhuanlan.zhihu.com/p/32554436?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com)
26. 0.1+0.2!=0.3为什么  
27. BFC 是什么  


