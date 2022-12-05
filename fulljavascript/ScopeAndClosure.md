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
i)	Lexical Scope 
ii)	Dynamic Scope
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


