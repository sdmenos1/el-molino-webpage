import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { CartProvider } from "../lib/cart";
import { CartFab } from "../components/cart/CartFab";
import { CartSidebar } from "../components/cart/CartSidebar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl gold-text">404</h1>
        <h2 className="mt-4 font-serif text-2xl text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscas no existe o ha sido movida.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-gold">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl text-foreground">Esta página no cargó</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo salió mal por nuestra parte. Puedes reintentar o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-gold"
          >
            Reintentar
          </button>
          <a href="/" className="btn-ghost-gold">Inicio</a>
        </div>
      </div>
    </div>
  );
}

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Cafetería El Molino",
  "alternateName": ["El Molino Fuenlabrada", "El Molino"],
  "url": "https://elmolinofuenlabrada.com",
  "logo": "https://elmolinofuenlabrada.com/logo.png",
  "image": "https://elmolinofuenlabrada.com/logo.png",
  "telephone": "+34916073781",
  "priceRange": "€",
  "servesCuisine": ["Española", "Tapas", "Desayunos", "Menú del día"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle de Francia, 11",
    "addressLocality": "Fuenlabrada",
    "addressRegion": "Madrid",
    "postalCode": "28943",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.2828,
    "longitude": -3.7932
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "22:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "21:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/elmolinofuenla"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "El Molino",
  "alternateName": "Cafetería El Molino Fuenlabrada",
  "url": "https://elmolinofuenlabrada.com"
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cafetería El Molino · Desayunos, Tapas y Menú en Fuenlabrada" },
      {
        name: "description",
        content:
          "Disfruta de la tortilla de patatas Nº1 de Fuenlabrada, desayunos desde las 07:00 AM, paella los miércoles y menú del día casero. Comanda por WhatsApp en El Molino.",
      },
      { name: "author", content: "Cafetería El Molino" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "theme-color", content: "#0A0908" },
      { property: "og:site_name", content: "Cafetería El Molino" },
      { property: "og:title", content: "Cafetería El Molino · Desayunos, Tapas y Menú en Fuenlabrada" },
      {
        property: "og:description",
        content:
          "La tortilla de patatas Nº1 de Fuenlabrada y los platos caseros tradicionales de siempre. Comanda rápida por WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://elmolinofuenlabrada.com/logo.png" },
      { property: "og:locale", content: "es_ES" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cafetería El Molino · Desayunos, Tapas y Menú en Fuenlabrada" },
      { name: "twitter:description", content: "Prepara tu comanda de desayunos, tapas o menú del día y confírmala por WhatsApp." },
      { name: "twitter:image", content: "https://elmolinofuenlabrada.com/logo.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/logo.png", type: "image/png" },
      { rel: "icon", sizes: "32x32", href: "/logo.png", type: "image/png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "shortcut icon", href: "/logo.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        {!isDashboard && <Header />}
        <main className="min-h-screen">
          <Outlet />
        </main>
        {!isDashboard && <Footer />}
        {!isDashboard && <CartFab />}
        {!isDashboard && <CartSidebar />}
      </CartProvider>
    </QueryClientProvider>
  );
}
