import Link from 'next/link';
import { MediaImage } from './media--image';

interface Logo {
  title: string;
  field_image: MediaImage;
  field_field_link_client_site: string;
}

interface LogoSingleProps {
  logo: Logo;
}

export function LogoSingle({ logo }) {
  if (!logo || !logo.title) {
    return null;
  }

  console.log('Logo link:', logo.field_field_link_client_site);


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
