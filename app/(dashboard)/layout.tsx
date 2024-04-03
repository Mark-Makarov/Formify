import ThemeSwitcher from "@/components/ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";
import Logo from "@/components/layout/Logo";

const Layout = ({ children } : { children: React.ReactNode }) => {
  const { NEXT_PUBLIC_CLERK_SIGN_IN_URL } = process.env;

  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
          <UserButton afterMultiSessionSingleSignOutUrl={NEXT_PUBLIC_CLERK_SIGN_IN_URL} />
        </div>
      </nav>
      <main className="flex w-full flex-grow">
        {children}
      </main>
    </div>
  )
};

export default Layout;
