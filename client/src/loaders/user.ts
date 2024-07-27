import { UserProfile } from "../scripts/userProfile";

export class userProfile {
  static load = async () => {
    const response = await fetch("src/views/pages/user/profile.html");
    const markup = await response.text();
    return response.ok ? markup : "Error loading user Profile";
  };

  static initEventListners = async () => {
    await UserProfile.load();
  };
}
