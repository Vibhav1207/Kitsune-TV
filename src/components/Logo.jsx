import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/home"}>
      <h1 className="gradient-text select-none flex text-xl">You visiting this site was part of my plan</h1>
    </Link>
  );
};

export default Logo;
