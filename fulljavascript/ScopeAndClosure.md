What is Scope?
Let's understand this

So all the programming language store values in varaibles and later retrieve or modify those value which is known as state.
Some questions you must be asking now
1. Where do those variable live or stored?
2. How does the program find them when it needs them?

Answer for these are : we defined some set of rules for storing variable in some location, and for finding those variable at a later time. 
And that set of rule is known as SCOPE.


In traditional compiled language ( Java ) process, a chunk of source code, your program will undergo typically 3 steps before it executed roughly called "COMPILATION".

Tokenizing/lexing

Breaking up a string of characters into meaningful (to the language) chunk, called tokens
for example var a = 2;  break this into var,a,=,2 and ; (whitespace may or may not be persisted as token, depending on whether its meaningful or not.)



Parsing: 
Taking an array of token turning it into a tree of nested elements, which collectively represent the grammatical structure of the program. This tree called an AST (Abstract syntax tree).

it is like top level node then child level or second level nested node 

Code-Generation

The process of taking an AST and turning it into executable code. This part varies greatly depending on the language, the platform it’s targeting and so on.

UnderStanding the SCOPE:

The Cast 
 it includes three things:
a)	ENGINE (V8 or spider monkey etc): responsible for start-to-finish compilation and execution of JavaScript Program.
b)	Compiler: One engine friend handles all the dirty work of parsing and code-generation 
c)	Scope: Another friend of Engine; collects and maintains a look-up list of all the declared identifier (variable) and enforce a strict set of rules as to how these are accessible to currently executing code.
BACK AND FPRTH:

ENGINE =>  COMPILER => SCOPE => ENGINE => SCOPE => COMPILER 
 This is how engine compiler and scope be in touch and keep asking things to each other continuously 

for example var a = 2;
Here Engines sees two different statements 
a.	Which will be handled by compiler during compilation
b.	Engine will handle during execution
Compiler will start as :
1.	Ask to scope if any variable with name a already exists for that particular scope collection. If scope collection already have a variable then it will directly through error else ask scope to declare one for that particular scope. 
2.	Compiler than produces code for Engine to later execute, to handle that a = 2 assignment. The code engine will first ask local scope it is accessible in the current scope else it will look into global scope. 
If engine find a either in local or global scope it will return 2 during execution otherwise it will yell out an error.

COMPILER SPEAK:
Engine would be performing LHS (look up for variable a) and RHS (look up for the reference of variable a)
a)	LHS look up is done when a variable appears on the left hand side of an assignment operation and an RHS look-up is done when a variable appears on the righthand side of an assignment operation.
For example console.log(a) //here RHS will look up for the reference
If a is declared then it will give value else it will show error (ReferenceError)
If a is declared and later we trying to do something (illegally trying to change the value) with the value of a it will give TypeError 

function foo(){
Console.log(a) //2
}
foo(2)
Engine and Scope conversation:
 Engine: Hey scope I have an RHS reference for foo.
Scope: yes compiler declared it few seconds ago.
Engine: Okay executing.
Engine: I got an LHS reference for a.
Scope: yes here it is
Engine: assigning 2 to a.
Engine: I need an RHS look up for console

Nested Scope:
This is scope inside another scope.
So in this case if engine will not find any RHS in current scope it will look up in global scope of that
current scope if not found there as well then it will yell an error. 

LEXICAL SCOPE
Type of Scope:
i)	Dynamic Scope
	=> this does not concern itself with how and where function and scope is declared but rather where they are called from
	In other words, the scope chain is based on the call-stack, not the nesting of scopes in code 

	function foo(){
		console.log(a)//10
	} 

	function bar(){
		var a = 10;
		foo()
	}
	var a = 2;
	bar() 

	here as we can see it should show 10 if this would be lexical scope but in dynamic scope it does not care where it is declared but where it is called.

	How can this be?
	Because when foo() can not resolve the variable reference for a, instead of stepping up the nested scope chain(lexical), it walks up the call stack, to find where foo() was called from.

	The Key contrast: lexical scope is write-time, whereas dynamic scope (and this!) are runtime. Lexical scope cares where a function was declared, but dynamic scope cares where the function was called from.


ii)	Lexical Scope 


Lex-time:
As we discussed the first traditional phase of a standard language compiler is called lexing/ tokenizing. 
So what lexing does is breaking up a source code character into meaningful chunk called tokens.
So lexical scope is scope that is defined at lexing time
Or
Lexical scope is based on where variables and blocks of scope are authored, by you, at write time and thus is set in stone by the time the lexer processes your code.

Function foo(a){
	Var b = a*2;
	Function bar(c){
	Console.log(a,b,c)
}
Bar(b*3);
}

This is strictly nested function.
Here global function have only one function foo.
Foo is having declared variable a,b, bar and bar is having only c.
This is kind of BUBBLE STRUCTURE.

Look-ups:
Scope look-up stops once it finds the first match. The same identifier name can be specified at multiple layers of nested scope, which is called SHADOWING (“the inner identifier shadows the outer identifier”)

No matter where the function is invoked from, how it is invoked, its lexical scope is only defined by where the function was declared. Like in example above for bar its lexical scope is till foo no matter where we invoke it.
Regardless of shadowing, scope lookup always starts at the innermost scope being executed at the time and works its way outward/upward until the first match and stops.

You can call any global variable automatically by using window key (window.a)  this will give you access to a global variable that would otherwise be inaccessible due to it being shadowed
However non-global shadowed cannot be accessible.

Cheating Lexical: 
1.	eval()
2.	with()
eval take a string as input and start treating that as an authored code.
For example if in input user will type alert(user) it will give all the data to the user which can be very dangerous.
Same with with() which can easily replace any global level variable which can create problem for any other function inside that global.
Both eval and with  can reduce performance 
How JS Engine performance works?
It has a no. of performance optimization that it performs during the compilation phase. Some of these boils down to being able to essential statically analyze the code as it lexes and predetermined where all the variable and functions declaration are, so that it takes less effort to resolve identifier during execution. 
But if engine find eval() or with() it will assume that all its awareness of identifier location may be invalid because it can not know at lexing time exactly what code you may pass to eval()….. bcz eval() will create its own new lexical scope.
So in simple word it will not perform optimizations at all.

					
					<!-- Function Versus Block Scope -->

<!-- Scope from Function -->
	only function create scope for itself but no other structure create their own scope in JS.

	function foo(){
		var a = 10;
		function bar(){
			var b = 20;
			console.log(b)
		}
	} 

	a is in the global scope of bar and b is in the local scope of bar and both a and bar are in the local scope of foo function 

<!-- Hiding in the plain scope -->

	we should not write or declare every variable/function or any structure in the global scope. They make global structure look very dirty, and all the variable will be accessible to nested functions which make it dangerous as well.
	so try to declare variable and function inside the function scope itself.
	Principle of Least Privilege/ Least Authority or Least Exposure

	Another benifit of hiding variable and function inside a scope is to avoid unintended collision between two different identifier with the same name but different intended usages.

	<!-- Function Declaration vs Function Expression -->

	if a function is having name like function foo(){} then this is known as declaration of a function 
	if a function is assingned to any variable then that is known as function expression. like var func = function(){}
	if a function is not having name fuction(){} this is known as anonymous function

	anonymous function make code look clean but they are not readable and hard to debug and can not do actions such as recursion. 

	<!-- IIFE (Invoking function Expression Immediatley) -->

	this kind of function written in this for (function(){.....})() the first () makes the function an expression and the second () executes the function

	var a = 2;

	(function IIFE ( def ){
		def( window )
	})(function def(global){
		var a = 3;
		console.log(a)//3
		console.log(global.a)//2
	})

	<!-- Blocks as scope -->

	Block-scoping means declare a variable as close as possible, as local as possible, to where they will be used

	Most of the other language support block scope 

	for(let i =0; i<10;i++){
		console.log(i)
		i++
	}
	why to pollute the entire scope of a function with the variable i that is only going to be used inside for loop => principle of privilege
				

	here i is declared directly inside the for loop and essentially ignore the fact that the variable actually scopes itslef to the enclosing scope ( function or global)

