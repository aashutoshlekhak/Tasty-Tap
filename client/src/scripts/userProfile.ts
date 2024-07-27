import axios from "axios";

export class UserProfile {
  static load = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/info",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = response.data;

      const updateProfile = () => {
        const imageElement: HTMLImageElement = document.getElementById(
          "profile_picture"
        ) as HTMLImageElement;
        imageElement.src = user.profile_picture;
        document.getElementById("full_name")!.textContent = user.full_name;
        document.getElementById("username")!.textContent = `@${user.username}`;
        document.getElementById("email")!.textContent = user.email;
        document.getElementById("address")!.textContent = user.address;
        document.getElementById("contact")!.textContent = user.contact;
        const profileSection = document.getElementById("profile-section");
        const updateProfileSection = document.getElementById(
          "update-profile-section"
        );
        const updateProfileButton = document.getElementById(
          "update-profile-button"
        )!;

        const closeUpdateProfileButton = document.getElementById(
          "close-update-profile-button"
        )!;

        updateProfileButton.addEventListener("click", () => {
          profileSection?.classList.replace("flex", "hidden");
          updateProfileSection?.classList.replace("hidden", "flex");
        });

        closeUpdateProfileButton.addEventListener("click", () => {
          profileSection?.classList.replace("hidden", "flex");
          updateProfileSection?.classList.replace("flex", "hidden");
        });
      };
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", updateProfile);
      } else {
        updateProfile();
      }
    } catch (error: any) {
      console.log(error);
    }
  };
}
