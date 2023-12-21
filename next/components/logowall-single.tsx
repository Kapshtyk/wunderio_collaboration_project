import Link from "next/link";

import { MediaImage } from "@/components/media--image";
import { LogoWall } from "@/lib/zod/logowall";

interface LogoSingleProps {
  logo: LogoWall;
}

export function LogoSingle({ logo }: LogoSingleProps) {
  if (!logo || !logo.title) {
    return null;
  }

  return (
    <Link href={logo.field_field_link_client_site.full_url} target="_blank">
      <div className="hover:scale-110 p-4 grayscale hover:filter-none bg-white h-40 transition-all duration-300 flex items-center justify-center space-y-10">
        {logo.field_image && (
          <MediaImage
            media={logo.field_image}
            alt={logo.title}
            className="max-h-24"
          />
        )}
      </div>
    </Link>
  );
}
