<div align="center">
  <h1 align="center">Instagram Grid Previewer & Panorama Splitter</h1>
  <p align="center">
    A high-fidelity, interactive tool to meticulously plan your Instagram profile. Preview your grid, edit your bio, manage highlights, and create stunning multi-post panoramic layouts with a powerful, built-in image splitter.
  </p>
</div>

<!-- You can replace this with a GIF or screenshot of the app in action! -->
<div align="center">
<img width="1200" alt="App Preview" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## ✨ Key Features

This application is packed with features to give you full control over your profile preview.

#### 🎨 Realistic Profile Simulation
*   **High-Fidelity UI:** A pixel-perfect replica of the modern Instagram profile page.
*   **Light & Dark Modes:** Instantly toggle between themes for an authentic preview experience.

#### ✏️ Fully Interactive Profile Editing
*   **Profile Picture:** Upload and preview your own profile picture.
*   **In-Place Text Editing:** Simply click to edit your name, pronouns, bio description, and link.
*   **Editable Stats:** Modify the post, follower, and following counts to match your current profile.

#### 🌟 Customizable Story Highlights
*   **Custom Thumbnails:** Upload a unique image for each of the five highlight circles.
*   **Editable Labels:** Click any highlight's name to edit its label.
*   **Drag & Drop Reordering:** Easily rearrange your story highlights by dragging them into your desired order.

#### 🖼️ Dynamic Grid Management
*   **Accurate 4:5 Aspect Ratio:** The grid respects Instagram's modern portrait post dimensions for a true-to-life preview.
*   **Batch Uploads:** Use the header menu to quickly populate the grid or highlights with multiple images at once.
*   **Realistic Post Removal:** When you clear an image, all subsequent posts shift up to fill the space, perfectly mimicking the native app's behavior.

#### ✂️ Advanced Panoramic Image Splitter
*   **Multi-Row Splitting:** Upload a single image and split it into a seamless panoramic layout across multiple rows (e.g., 1 row for 3 posts, 2 rows for 6 posts).
*   **Precise Fit Controls:** Use "Auto," "Fit Width," or "Fit Height" options to control exactly how your source image is cropped.
*   **Background Color for Transparency:** Set a custom background color for transparent images (like PNGs) to ensure a clean, uniform look in your final posts.
*   **Seamless Integration:** Once confirmed, your newly split images are automatically added to the top of your profile grid preview.

#### 📂 Split History & Downloads
*   **Automatic Archiving:** The app saves a history of every panoramic image you create.
*   **Easy Access:** View your history at any time from the bottom navigation menu.
*   **One-Click Downloads:** Download the full set of high-resolution split images for any entry with a single click.

## 🚀 How to Use

1.  **Customize Your Profile:**
    *   Click the profile picture icon to upload your avatar.
    *   Click on your name, bio, or stats to edit them directly.
    *   Click a highlight circle to upload a thumbnail, or click its label to rename it. Drag and drop to reorder highlights.

2.  **Populate the Grid:**
    *   Click any empty gray square to upload a single image.
    *   Click the **`+` icon** in the top-right header to access the menu for batch-uploading images to the grid or highlights.

3.  **Create a Panoramic Split:**
    *   Click the **`+` icon** in the center of the bottom navigation bar.
    *   Select "Split an image" from the menu.
    *   In the new window, upload your wide image.
    *   Configure your split: choose the number of rows, the image fit, and a background color if needed.
    *   Click "Confirm Split" to see the result.
    *   Click "Back to Profile" to add the new posts to your main grid.

4.  **Download Your Creations:**
    *   Click the **`+` icon** in the bottom navigation bar and select "See Split History."
    *   Find the image set you want and click the "Download" button.

## 🛠️ Tech Stack

*   **Frontend Framework:** [React](https://react.dev/) (with Hooks)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Graphics Engine:** The image splitter is powered by the **HTML5 Canvas API**, performing all calculations and manipulations directly in the browser—no server needed.

## 📦 Running the Project

This is a static, client-side application with no build steps required.

1.  Clone or download the repository.
2.  Open the `index.html` file in your favorite web browser.
3.  That's it! The application is ready to use.
