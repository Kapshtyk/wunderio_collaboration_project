import Link from "next/link";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import Image from "next/image";

export function WorkArticleCard({ workArticle }) {
    return (
        <div key={workArticle.id}
            className="block max-w-[22rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <Link href={workArticle.path.alias}>
                <div className="relative overflow-hidden bg-cover bg-no-repeat h-64">
                    <Image className="hover:saturate-150" width={400} height={500} src={absoluteUrl(workArticle.field_image.uri.url)} alt={workArticle.field_image.resourceIdObjMeta.alt} />
                </div>
            </Link>

            <div className="p-6">
                <p className="text-base text-sm text-secondary-900">
                    <Link href="/all-articles"> <span className="hover:underline">{workArticle.type.split('--')[1].toUpperCase()}</span> </Link>
                </p>
            </div>

            <Link href={workArticle.path.alias}>
                <div className="p-6">
                    <h1 className="text-primary-600 font-bold hover:underline">
                        {workArticle.title}
                    </h1>
                </div>
            </Link>
        </div>
    )
}
