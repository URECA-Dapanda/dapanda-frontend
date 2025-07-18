import { useRouter } from "next/navigation";

export function useProfile(id: string) {
  const router = useRouter();

  return router.push(`review${id === "my" ? "" : id}`);
}
