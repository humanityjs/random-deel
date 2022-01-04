### `1. What is the difference between Component and PureComponent? give an example where it might break my app.`

React Component and PureComponent are almost the same. The only difference is PureComponent handles shouldComponentUpdate and re-renders when there is a prop change. On the other hand, you'll have to handle component update if you were to use Component. 

If you have a component you don't want to re-render when the prop changes, you might want to not use PureComponent. Even if you need to perform some actions based on prop changes, you should use other means to ensure you have control over the re-renders. React.memo should be a perfect use case in this scenario.

### `2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?`

Not sure I fully understand the question. I will answer it based on the assumption that Context should not be used with ShouldComponentUpdate.

Based on experience, you don't need ShouldComponentUpdate when you use Context. The Context API is designed to deliver updates to components in real time. Using ShouldComponentUpdate might cause some unecessary re-renders and affect the overall performance of the app.


### `3. Describe 3 ways to pass information from a component to its PARENT.`

One way is to pass a function from the parent component down to the child component. 

```
const Child = ({fromChild}) => {
  return <button onClick={() => fromChild('some info')}>Click me</button>
}

const Parent = () => {
  const fromChild = (info) => {
    // do anything you want with info
  }

  return <Child fromChild={fromChild}> 
}
```
Another way is to use ref.

```
const ChildComponent = React.forwardRef((props, ref) => {
  const [str, setStr] = React.useState('');

  React.useImperativeHandle(ref, () => ({
    getValue: () => {
     return str;
    }
  }));

  return (
    <input
      val={val}
      onChange={e => setStr(e.target.value)}
      {...props}
    />
  );
});

const Parent = () => {
  const ref = React.useRef(null);
  const value = () => {
    // access all the properties here
    console.log(ref.current)
    return ref.current.getValue();
  };

  return <ChildComponent ref={value} />;
};
```

One other way I can think of is to use Context/Redux or any state management library. That way you can easily change things in the child component and see it take effect in the parent component.


### `4. Give 2 ways to prevent components from re-rendering.`

The best way to prevent re-renders is to write codes that is optimized. You dont' want to pass props that are not needed/necessary. Making use of useMemo and useCallback for functions also ensures that the component only re-renders when needed. Also, if you are not doing anything fancy, you should use a functional component.

If all of those are not avoidable, React.memo provides a clean way of manually checking for prop changes and deciding which one to act on.



### `5. What is a fragment and why do we need it? Give an example where it might break my app.`
A fragment is used in place of the standard html semantic elements. It allows you to write React code without wrapping it in a semantic element. For example

```
const App = () => {
  return (
    <>
      Some text
    </>
  )
};

or 

const App = () => {
  return (
    <React.Fragment>
      Some text
    </React.Fragment>
  )
};

```

### `6. Give 3 examples of the HOC pattern.`
Note sure I totally understand this. If this is about examples of components that uses the HOC patterns

- React Router -> withRouter
- Redux -> connect


### `7. what's the difference in handling exceptions in promises, callbacks and async...await.`

For promises, you can simply add a `.catch` to handle any error from promises. E.g.

```

const reject = new Promise((resolve, reject) => reject('message'));

reject()
.then(() => {
  // do something if it's successful
})
.catch((e) => {
  // this would fail and print the error message
  console.log(e.message);
})
```

Callbacks are a little bit tricky, you need to ensure the error is passed to the callback and you do something with it. For example,

```
const somePromise = new Promise((resolve, reject) => reject('message'));

const callback = (success, error) => {
  if (success) {
    // do something
  }

  if (error) {
    // do something with the error
  }
}

const someOtherFunction = () => {
  try {
    const result = await somePromise()
    callback(result) // returns success if it's successful
  } catch (e) {
    // it failed, send the error via callback
    callback(null, e)
  }
}
```

Async/Await makes it easy to deal with promises when used with a `try/catch` block.

```
const someOtherFunction = () => {
  try {
    const result = await somePromise()
    callback(result) // returns success if it's successful
  } catch (e) {
    // it failed, send the error via callback
    callback(null, e)
  }
}
```

### `8. How many arguments does setState take and why is it async.`

`setState` takes 1 argument. The argument can either be a value or a callback function. 

### `9. List the steps needed to migrate a Class to Function Component.`

I think the most important thing is to understand the how functional components works. I'll start by looking at the class component and identifying the methods contained in it.

I know every lifecycle method will authomatically become a hook (componentDidMount -> useEffect, componentDidUpdate -> useEffect, this.state => useState, render -> return). Once I'm able to do that, the rest is easy.


### `10. List a few ways styles can be used with components.`

- Using styled components
- Declaring styles within the component
- Writing styles in a styled file and importing it into the component. The classes can then be accessed using `className or id`.


### `11. How to render an HTML string coming from the server.`

You can use `dangerouslySetInnerHTML` props.

For example,

```
<li dangerouslySetInnerHTML={{ __html: STRING_FROM_SERVER }}></li>;
```