import Link from "next/link";

const Logo = () => {
  const { main } = process.env.routes;

  return (
    <Link
      className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent
      bg-clip-text hover:cursor-pointer"
      href={main}
    >
      Formify
    </Link>
  )
};

export default Logo;
