import { ICartMenu } from "../../interface/menu.interface";

export function generateCartRow(cartData: ICartMenu) {
  const markup = `
        <tr class="border-b border-neutral-300 ">
          <td class="px-5 py-4">
            <img
              src="${cartData.image_url}"
              alt="product"
              class="w-16 h-16 object-cover rounded-lg"
              data-id="${cartData.id}"
            />
          </td>
          <td class="py-3 px-4">${cartData.name}</td>
          <td class="py-3 px-4">₹ ${cartData.price}</td>
          <td class="py-3 px-4">
            <input
              type="number"
              value="${cartData.quantity}"
              class="p-2  bg-white border border-neutral-300 rounded menu-item-quantity"
              data-id="${cartData.id}"
            />
          </td>
          <td class="py-3 px-4" class="menu-item-total-price" data-id="${cartData.id}">₹ ${cartData.total}</td>
        </tr>
    `;

  return markup;
}
