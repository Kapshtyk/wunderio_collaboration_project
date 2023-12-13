import { LegalDocument } from "@/lib/zod/legal-document";

import { FormattedText } from "./formatted-text";
import { Meta } from "./meta";

interface LegalDocumentProps {
  legal_document: LegalDocument;
}

export default function LegalDocument({ legal_document }: LegalDocumentProps) {
  return (
    <>
      <Meta title={legal_document.title} metatags={legal_document.metatag} />
      <div className="bg-primary-400/40">
        <h1 className="text-2xl text-bold">{legal_document.title}</h1>
      </div>

      <FormattedText html={legal_document.body.processed} />
    </>
  );
}
