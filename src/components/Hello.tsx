type Props = {
  name: string;
};
export const Hello = (props: Props) => {
  return <p className="mt-4 text-lg">Hello, {props.name}</p>;
};

export default Hello;
