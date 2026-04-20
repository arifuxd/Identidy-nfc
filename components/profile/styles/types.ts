import type { Database } from "@/types/database";

export interface ProfileStyleProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
  socialLinks: Database["public"]["Tables"]["social_links"]["Row"][];
  experiences: Database["public"]["Tables"]["experiences"]["Row"][];
}
