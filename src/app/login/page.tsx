import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { RestoGoLogo } from "@/components/icons"

export default function LoginPage() {
  const bgImage = PlaceHolderImages.find(img => img.id === 'login-background');
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
       <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Link href="/" className="flex justify-center items-center space-x-2 mb-4">
                <RestoGoLogo className="h-8 w-auto text-primary-foreground" />
            </Link>
            <h1 className="text-3xl font-bold font-headline">Login</h1>
            <p className="text-balance text-muted-foreground">
              Introduce tu email para acceder a tu cuenta
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login con Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="underline">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {bgImage && (
            <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            data-ai-hint={bgImage.imageHint}
            fill
            className="object-cover dark:brightness-[0.2] dark:grayscale"
            />
        )}
      </div>
    </div>
  )
}
