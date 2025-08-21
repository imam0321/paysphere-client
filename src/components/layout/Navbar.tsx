import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { ArrowRight, Menu, Wallet } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { ModeToggle } from "./mode.toggle";

export default function Navbar() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/features", label: "Features" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white grid place-items-center shadow-md">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="text-lg">PaySphere</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-1">
                {links.map((l) => (
                  <NavigationMenuItem key={l.to}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={l.to}
                        className="px-3 py-2 text-sm rounded-xl hover:bg-muted"
                      >
                        {l.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <ModeToggle />
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-2xl">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="mt-6 space-y-2">
                  <NavigationMenu>
                    <NavigationMenuList className="flex flex-col items-start gap-1">
                      {links.map((l) => (
                        <NavigationMenuItem key={l.to}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={l.to}
                              // onClick={onNavigate}
                              className="px-3 py-2 text-sm rounded-xl hover:bg-muted"
                            >
                              {l.label}
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <Link to="/auth/login">
                    <Button className="w-full rounded-2xl">Login</Button>
                  </Link>
                  <Link to="/auth/register">
                    <Button variant="secondary" className="w-full rounded-2xl">
                      Create account
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Link to="/auth/login">
            <Button variant="ghost" className="rounded-2xl">
              Login
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button className="rounded-2xl">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
