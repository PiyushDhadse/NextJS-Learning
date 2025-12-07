"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function ExampleClientComponent() {
  const params = useParams();
  const router = useRouter();
  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log(params);

  return (
    <div>
      Tag: {params.tag} <br />
      Item: {params.item} <br />
      Slug: {params.slug}
      <button type="button" onClick={() => router.push("/dashboard")}>
        Dashboard
      </button>
    </div>
  );
}
