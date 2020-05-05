## Step One: The `createElement` Function

Let's start with another app. This time we'll replace React code with our own version of React and we start by writing our own version of `createElement`.

```jsx
const element = (
  <div id="foo">
    <a> bar </a>
    <b />
  </div>
);
const container = document.getElementById('root');
ReactDOM.render(element, container);
```

Let's transform the JSX to JS to see the `createElement` calls.

```js
const element = React.createElement(
  'div',
  { id: 'foo' },
  React.createElement('a', null, 'bar'),
  React.createElement('b')
);
const container = document.getElementById('root');
ReactDOM.render(element, container);
```

As we saw in step 0, an element is an object with `type` and `props`. The only thing the function needs to do is to create that object. We can use the _spread operator_ for the `props` and the _rest parameter syntax_ for the `children`, this way the `children` prop will always be an array.

```js
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children
    }
  };
}
```

For example, `createElement("div")` returns:

```js
{
    "type": "div",
    "props": { "children": [] }
}
```

`createElement("div", null, a)` returns:

```js
{
    "type": "div",
    "props": { "children": [a] }
}
```

and `createElement("div", null, a, b)` returns:

```js
{
    "type": "div",
    "props": { "children": [a, b] }
}
```

The `children` array could also contain primitive values like strings or numbers. So we'll wrap everything that isn't an object inside it's own element and create a special type for them: `TEXT_ELEMENT`.

_Note - React doesn’t wrap primitive values or create empty arrays when there aren’t `children`, but we do it because it will simplify our code, and for our library we prefer simple code than performant code._

```js
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      )
    }
  };
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  };
}
```

We are still using React's `createElement`. To replace it, let's give a name to our library.

```js
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      )
    }
  };
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  };
}

const SimplifiedReact = {
  createElement
};

const element = SimplifiedReact.createElement(
  'div',
  { id: 'foo' },
  SimplifiedReact.createElement('a', null, 'bar'),
  SimplifiedReact.createElement('b')
);

const container = document.getElementById('root');
ReactDOM.render(element, container);
```

This is good progress! But we still want to use JSX. How do we tell Babel to use SimplifiedReact's `createElement` instead of React's?

If we add a comment `/** @jsx SimplifiedReact.createElement */` above element, Babel will use the function we defined when it transpiles JSX.

```js
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      )
    }
  };
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  };
}

const SimplifiedReact = {
  createElement
};

/** @jsx SimplifiedReact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

const container = document.getElementById('root');
ReactDOM.render(element, container);
```
