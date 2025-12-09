import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      {...props}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="'Playfair Display', serif"
        fontSize="100"
        fontWeight="bold"
        fill="hsl(var(--primary-foreground))"
        className="fill-current text-primary-foreground"
      >
        RG
      </text>
    </svg>
  );
}

export function RestoGoLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center" {...props}>
      <span 
        className="font-headline text-2xl font-bold tracking-tight text-primary-foreground"
      >
        RestoGo
      </span>
    </div>
  )
}
