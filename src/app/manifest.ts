import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Notichi',
    short_name: 'Notichi',
    description: 'Notichi, a NoteBook App',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fed700',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16',
        type: 'image/x-icon',
      },
      {
        src: "/icons/icon-36x36.png",
        type: "image/png",
        sizes: "36x36"
      },
      {
        src: "/icons/icon-48x48.png",
        type: "image/png",
        sizes: "48x48"
      },
      {
        src: "/icons/icon-72x72.png",
        type: "image/png",
        sizes: "72x72"
      },
      {
        src: "/icons/icon-96x96.png",
        type: "image/png",
        sizes: "96x96"
      },
      {
        src: "/icons/icon-144x144.png",
        type: "image/png",
        sizes: "144x144"
      },
      {
        src: "/icons/icon-192x192.png",
        type: "image/png",
        sizes: "192x192"
      },
      {
        src: "/icons/icon-512x512.png",
        type: "image/png",
        sizes: "512x512"
      },
      {
        src: "/icons/maskable.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "maskable"
      }
    ],
  }
}