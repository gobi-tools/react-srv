function MyButton () {
  return <button>Click me!</button>
};

export default function Page(props: { name: string }) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <MyButton/>
  </>
}