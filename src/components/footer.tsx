import Link from "next/link";
import { RestoGoLogo } from "./icons";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <RestoGoLogo />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} RestoGo. Todos los derechos reservados.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/admin" className="transition-colors hover:text-foreground">Admin</Link>
          <Link href="/login" className="transition-colors hover:text-foreground">Login</Link>
          <Link href="/register" className="transition-colors hover:text-foreground">Registro</Link>
        </div>
      </div>
    </footer>
  );
}
