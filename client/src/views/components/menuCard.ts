import IMenu from "../../interface/menu.interface";

export function MenuCard(menu: IMenu) {
  const markup = `
    <div
    data-id="${menu.id}"
    class="menu-card rounded-lg border-neutral-500 border-2 border-dashed bg-yellow-100 relative w-[300px] m-4 p-1"
    >
    <p
        class="inline-block absolute top-0 left-0 p-1 rounded-lg bg-red-500 text-white font-light text-xs opacity-90 z-10"
    >
        ${menu.category}
    </p>
    <div class="image-container w-full rounded-lg mb-2 overflow-hidden">
        <img
        src="${menu.image_url}"
        class="w-full h-[180px] object-cover object-center hover:scale-105 hover:z-0 transition-all duration-500"
        alt="menu-image"
        />
    </div>
    <div class="flex justify-between px-3 items-center gap-2 mb-1">
        <h2 class="text-xl font-semibold">${menu.name}</h2>
        <hr class="flex-grow border-dashed border-neutral-500" />
        <p class="text-lg font-semibold text-green-600">₹ ${menu.price}</p>
    </div>
    <p
        class="px-3 mb-5 italic font-extralight text-xs text-neutral-500 text-justify min-h-[50px] max-h-[50px] overflow-scroll"
    >
        ${menu.description}
    </p>
    <div class="navigation-buttons flex gap-1 px-2 mb-2">
        
        <button
        class="bg-black flex-grow h-8 text-white font-extralight text-sm p-1 flex items-center justify-center rounded-lg hover:bg-green-800 addToCart"
        data-id="${menu.id}"
        >
        Add to Cart
        </button>
        
        
    </div>
    <div class="hidden items-center justify-center gap-2 px-2">
        <button
        class="w-[45%] flex-grow rounded-lg text-red-500 border-red-500 hover:text-white hover:bg-red-500 font-semibold border deleteMenuCard"

        data-id="${menu.id}"
        >
        Delete
        </button>
        <button
        class="w-[45%] flex-grow rounded-lg text-green-500 border-green-500 hover:text-white hover:bg-green-500 font-semibold border editMenuCard"
        data-id="${menu.id}"
        >
        Edit
        </button>
    </div>
    </div>
    `;

  return markup;
}
