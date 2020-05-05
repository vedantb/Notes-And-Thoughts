## Step Zero: Review

Let's use this React app, just 3 lines of code. The first line defines a React element. The next one gets a node from the DOM. The last one renders the React element into the container.

```jsx
const element = <h1 title="foo">Hello</h1>;
const container = document.getElementById('root');
ReactDOM.render(element, container);
```

**Let's convert the React code to vanilla JS.**

On the first line we have the element in JSX. That isn't even valid JS so first lets change to valid JS.

```jsx
const element = <h1 title="foo">Hello</h1>;
```

JSX is transformed to JS by build tools like Babel. The transformation is really simple! It replaces the tags with a call to `React.createElement` and passes the tag name, props and children as parameters.

```jsx
const element = React.createElement('h1', { title: 'foo' }, 'Hello');
const container = document.getElementById('root');
ReactDOM.render(element, container);
```

`React,createElement` creates an object from it's arguments. Besides some validations, that's all! So let's replace this now!

```js
const element = {
  type: 'h1',
  props: {
    title: 'foo',
    children: 'Hello'
  }
};
const container = document.getElementById('root');
ReactDOM.render(element, container);
```

And that's all an element is! It's an object with two properties: `type` and `props`. (It does have more but we only care about these)

The `type` is a string which specifies the type of DOM node we want to create, it's the `tagName` you pass to `document.createElement` when you want to create an HTMl element. It can also be a function but we'll leave that for later.

`props` is another object. It has all the keys and values from JSX attributes. It also has this special property `children`.

`chilren` in this case is a string but it's usually an array with more elements. That's why elements are also trees.

The next piece of code we need to replace is the call to `ReactDOM.render`. `render` is where React changes the DOM. So let's update that ourselves!
1 - First we create a node using the element `type`, in this case `h1`. Then we assign all the element `props` to that node. Here it's just the title. (Note that "node" will refer to DOM elements and "element" will refer to React elements to avoid confusion).

2 - Then we create nodes for the children. We only have a string as a child, so we create a text node.
Using `textNode` instead of setting `innerText` will help us later!

3 - Finally we append the `textNode` to the `h1` and the `h1` to the `container`.

```js
const element = {
  type: 'h1', // 1
  props: {
    title: 'foo', // 1
    children: 'Hello' // 2
  }
};
const container = document.getElementById('root'); // 3

const node = document.createElement(element.type); // 1
node['title'] = element.props.title; // 1

const text = document.createTextNode(''); // 2
text['nodeValue'] = element.props.children; // 2

node.appendChild(text); // 3
container.appendChild(node); // 3
```

Now we have the same app as before! But we are not using React!
