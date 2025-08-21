import Logo from "@/assets/icons/Logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { ModeToggle } from "./mode.toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "#features", label: "Features" },
  { to: "#pricing", label: "Pricing" },
  { to: "#contact", label: "Contact" },
  { to: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = (to: string) => {
    if (to.startsWith("#")) {
      const el = document.querySelector(to);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0)
    }
    
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-1">
              {navLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.to.startsWith("#") ? "/" : link.to}
                      onClick={() => handleScroll(link.to)}
                      className="text-foreground hover:text-primary flex-row items-center gap-2 py-1.5 font-medium"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-2xl"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <ModeToggle />
            <SheetContent side="right" className="w-72">
              <div className="mt-6 space-y-2">
                <NavigationMenu>
                  <NavigationMenuList className="flex flex-col items-start gap-1 px-2">
                    {navLinks.map((link) => (
                      <NavigationMenuItem key={link.to}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.to.startsWith("#") ? "/" : link.to}
                            onClick={() => {
                              handleScroll(link.to);
                              setOpen(false);
                            }}
                            className="text-foreground hover:text-primary flex-row items-center gap-2 py-1.5 font-medium"
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <Separator className="my-2" />
              <div className="grid gap-3 mx-2">
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button className="w-full rounded-2xl">Login</Button>
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}>
                  <Button variant="secondary" className="w-full rounded-2xl">
                    Create account
                  </Button>
                </Link>
              </div>

              <SheetHeader className="sr-only">
                <SheetTitle>Navbar</SheetTitle>
                <SheetDescription>Navbar</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/auth/login">
            <Button
              variant="outline"
              className="rounded-2xl"
              aria-label="Login"
            >
              Login
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button className="rounded-2xl">Sign up</Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
