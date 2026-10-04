import type { NextConfig } from "next";

const productionContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'none'",
  "connect-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self'",
  "font-src 'self'",
  "worker-src 'self'",
  "manifest-src 'self'",
].join("; ");

const productionSecurityHeaders = [
  { key: "Content-Security-Policy", value: productionContentSecurityPolicy },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  ...(process.env.NEXLABS_PRODUCTION_CONTAINER === "1"
    ? { output: "standalone" }
    : {}),
  ...(process.env.NODE_ENV === "production"
    ? {
        headers: () =>
          Promise.resolve([
            {
              source: "/",
              headers: [
                {
                  key: "Link",
                  value:
                    '</hero/home-hero-poster.jpg>; rel=preload; as=image; media="(min-width: 641px)", </hero/home-hero-poster-mobile.jpg>; rel=preload; as=image; media="(max-width: 640px)"',
                },
              ],
            },
            {
              source: String.raw`/:path((?!_next/static|_next/image|robots\.txt|icon\.svg).*)`,
              headers: productionSecurityHeaders,
            },
          ]),
      }
    : {}),
  ...(process.env.NEXT_DOCKER_DEV === "1"
    ? {
        allowedDevOrigins: ["127.0.0.1"],
        webpack(config, { dev }) {
          if (dev) {
            config.watchOptions = {
              ...config.watchOptions,
              poll: 1000,
            };
          }

          return config;
        },
      }
    : {}),
};

export default nextConfig;
