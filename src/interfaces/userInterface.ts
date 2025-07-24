export interface UserProfileDTO {
  id: number;
  name: string;
  username: string;
  email: string;
  profile_image_url: string;
  tier_id: number | null;
}
