import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThemeToggler } from "../ThemeToggler";
import { Link, NavLink } from "react-router";
import {
  authApi,
  useLogOutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";
import { role } from "@/constant/role";

const navigationLinks = [
  { href: "/", label: "Home", role: role.public },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/sender", label: "Dashboard", role: role.sender },
  { href: "/receiver", label: "Dashboard", role: role.receiver },
  { href: "/about", label: "About", role: role.public },
  { href: "/contact", label: "Contact", role: role.public },
];

export default function Navbar() {
  const { data, isLoading } = useUserInfoQuery();
  const [logout] = useLogOutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log(res);
      toast.success(res.data?.message);
      dispatch(authApi.util.resetApiState());
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <header className="container mx-auto border-b">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {/* Nav === Mobile */}
                  {navigationLinks.map((link, index) => (
                    <>
                      {link.role === role.public && (
                        <NavigationMenuItem key={index} className="w-full">
                          <NavigationMenuLink asChild className="py-1.5">
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )}

                      {link.role === data?.role && (
                        <NavigationMenuItem key={index} className="w-full">
                          <NavigationMenuLink asChild className="py-1.5">
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )}
                    </>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav === Desktop */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <div key={index}>
                    {link.role === role.public && (
                      <NavigationMenuItem className="w-full">
                        <NavigationMenuLink asChild className="py-1.5">
                          <NavLink to={link.href}>{link.label}</NavLink>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}

                    {link.role === data?.role && (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink asChild className="py-1.5">
                          <NavLink to={link.href}>{link.label}</NavLink>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggler />

          {!isLoading && data ? (
            <Button size="sm" className="text-sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button asChild size="sm" className="text-sm">
              <Link to={"/login"}>Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
