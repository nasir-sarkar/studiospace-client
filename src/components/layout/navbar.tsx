"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  Store,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import { clearServerSession } from "@/lib/api";
import { useSession } from "@/components/providers/session-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

const accountLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/add-studio", label: "Add New Studio", icon: PlusCircle },
  { href: "/my-listings", label: "My Studio Listings", icon: Store },
  { href: "/my-bookings", label: "My Bookings", icon: CalendarCheck },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useSession();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogout = async () => {
    await authClient.signOut();
    await clearServerSession();
    toast.success("You have been logged out.");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <nav className="page-container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          <Logo />
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive(link.href)
                      ? "text-primary after:absolute after:inset-x-3 after:-bottom-[17px] after:h-0.5 after:rounded-full after:bg-primary"
                      : "text-foreground/80",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                openOnHover
                delay={100}
                aria-label="Open account menu"
                title={user.name}
                className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Avatar className="size-10 border border-border">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={user.image as string}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="px-3 py-2">
                  <p className="truncate font-semibold text-foreground">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                {accountLinks.map((link) => (
                  <DropdownMenuItem
                    key={link.href}
                    render={<Link href={link.href} />}
                    className="gap-2 py-2"
                  >
                    <link.icon className="size-4" />
                    {link.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  variant="destructive"
                  className="gap-2 py-2"
                >
                  <LogOut className="size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button render={<Link href="/login" />} nativeButton={false} variant="outline">
                Login
              </Button>
              <Button render={<Link href="/register" />} nativeButton={false}>
                Register
              </Button>
            </div>
          )}

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu" />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose
                      render={<Link href={link.href} />}
                      className={cn(
                        "block rounded-md px-3 py-2.5 text-sm font-medium",
                        isActive(link.href)
                          ? "bg-accent text-primary"
                          : "text-foreground hover:bg-muted",
                      )}
                    >
                      {link.label}
                    </SheetClose>
                  </li>
                ))}
              </ul>
              {!user && (
                <div className="mt-4 flex flex-col gap-2 px-4">
                  <SheetClose
                    render={<Link href="/login" />}
                    className="inline-flex h-10 items-center justify-center rounded-lg border border-border text-sm font-medium"
                  >
                    Login
                  </SheetClose>
                  <SheetClose
                    render={<Link href="/register" />}
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground"
                  >
                    Register
                  </SheetClose>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
