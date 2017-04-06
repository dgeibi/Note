---
title: Statement
---

## var

The variable statement declares a variable, optionally initializing it to a value.

## let

``` javascript
{
    let variable;
}

variable // Uncaught ReferenceError: variable is not defined
```

## const

Constants are block-scoped, much like variables defined using the let statement. The value of a constant cannot change through re-assignment, and it can't be redeclared. Complex types are NOT fully read-only

## if

```javascript
if (conditon) {
    statement1
} else {
    statement2
}
```

## do-while

```javascript
do {
    statement
} while (expression);
```

## while

```javascript
while(expression) {
    statement
}
```

## for

```javascript
for(initialization; expresion; post-loop-expression) {
    statement
}
```

## for-in

```javascript
for(property in expression) {
    statement
}
```

## label

```javascript
labelName:
statement
```

## break & continue

```javascript
continue labelName;
continue;
```

```javascript
break labelName;
break;
```

## with

...

## switch

```javascript
switch (expression) {
    case value:
        statement
        break;
    case value:
        statement
        break;
    default:
        statement
}
```

```javascript
switch (true) {
    case condition:
        statement
        break;
    case condition:
        statement
        break;
    default:
        statement
}
```
