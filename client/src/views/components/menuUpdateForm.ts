import IMenu from "../../interface/menu.interface";

export default function updateMenuForm(menu: IMenu) {
  const markup = `
        <section
        id="menu-details"
        class="w-full min-h[calc(100vh-85px)] flex items-center justify-center gap-12"
        >
        <div
            class="flex flex-col text-gray-700 p-4 border-dashed border border-neutral-500 rounded-lg bg-yellow-50"
        >
            <h4 class="text-2xl font-semibold text-blue-gray-900">Update Menu</h4>

            <form id="updateMenuForm" class="mt-4 mb-1 w-80">
            <!-- Name Field -->
            <div class="flex flex-col gap-2 mb-1">
                <p class="text-base font-semibold text-blue-gray-900">Name</p>
                <div class="relative h-10 w-full min-w-[200px]">
                <input
                    id="name"
                    name="name"
                    placeholder="Food Name"
                    class="h-full w-full rounded-md border border-gray-300 px-2 py-2 text-sm"
                    value="${menu.name}"
                    required
                />
                </div>
            </div>

            <!-- Price Field -->
            <div class="flex flex-col gap-2 mb-1">
                <p class="text-base font-semibold text-blue-gray-900">Price</p>
                <div class="relative h-10 w-full min-w-[200px]">
                <input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Price"
                    class="h-full w-full rounded-md border border-gray-300 px-2 py-2 text-sm"
                    value="${menu.price}"
                    required
                />
                </div>
            </div>

            <!-- Image Field -->
            <div class="flex flex-col gap-2 mb-1">
                <p class="text-base font-semibold text-blue-gray-900">Image</p>
                <div class="relative h-10 w-full min-h-[200px] mb-2">
                <img
                    id="imagePreview"
                    src="${menu.image_url}"
                    alt="Old Image"
                    class="mb-2 rounded-md border border-gray-300"
                    style="height: 150px; object-fit: cover"
                />
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    class="w-full rounded-md border border-gray-300 px-2 py-2 text-sm"
                    
                />
                </div>
            </div>

            <!-- Category Field -->
            <div class="flex flex-col gap-2 mb-1">
                <p class="text-base font-semibold text-blue-gray-900">Category</p>
                <div class="relative h-10 w-full min-w-[200px]">
                <input
                    id="category"
                    name="category"
                    placeholder="Food Category"
                    class="h-full w-full rounded-md border border-gray-300 px-2 py-2 text-sm"
                    value="${menu.category}"
                    required
                />
                </div>
            </div>

            <!-- Description Field -->
            <div class="flex flex-col gap-2 mb-1">
                <p class="text-base font-semibold text-blue-gray-900">Description</p>
                <textarea
                id="description"
                name="description"
                placeholder="Description"
                class="h-full w-full rounded-md border border-gray-300 px-2 py-2 text-sm"
                rows="4"
                required
                >${menu.description}</textarea
                >
            </div>

            <button
                type="submit"
                class="mt-2 w-full bg-orange-500 text-white py-2 rounded-md"
            >
                Update Menu Item
            </button>
            </form>
        </div>
        <div class="flex flex-col items-center">
            <input type="text" class="menu-review border rounded-md" />
            <div class="reviews flex flex-col gap-5">
                
                <div class="review mt-4 w-full rounded-lg px-16 py-4 bg-blue-500">
                    <p class="review text text-white text-sm font-semibold">review</p>
                </div>
            </div>
        
        </div>
        </section>
    `;

  return markup;
}
