import { Html } from "@react-three/drei";
import ReactLoader from "react-js-loader";
import cartoonLoader from '../assets/gifs/cartoon-loader.gif';

const Loader = () => {
  const color = '#ded8d7';
  return (
    <Html>
        <div className={'absolute left-0 right-0 z-10 flex items-center justify-center'}>
            <div className={"item"}>
                <CartoonLoader />
                <ReactLoader type="bubble-loop" bgColor={color} color={color} size={50} />
            </div>
        </div>
    </Html>
  );
};


const CartoonLoader = () => {
  return (
      <img src={cartoonLoader} alt='Loading GIF' width='100' height='50' />
  );
}

export default Loader;
