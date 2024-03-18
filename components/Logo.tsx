import Link from "next/link";

const Logo = () => {
  const { main } = process.env.routes;

  return <Link href={main}>Formify</Link>
};

export default Logo;
