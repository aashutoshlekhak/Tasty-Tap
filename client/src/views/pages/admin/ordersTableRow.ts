import { IOrder } from "../../../interface/order.interface";

export function generateOrderRow(orderData: IOrder) {
  const markup = `
    <tr class="border-b">
          <td class="py-2 px-4">${orderData.id}</td>
          <td class="py-2 px-4">${orderData.user}</td>
          <td class="py-2 px-4">${orderData.product}</td>
          <td class="p-4">${orderData.quantity}</td>
          <td class="py-2 px-4">
            <select
              name="delivery-status"
              data-id="${orderData.id}"
              id="delivery-status"
              class="bg-white px-4 py-2 rounded-lg text-yellow-500 border border-yellow-500"
            >
              <option value="PENDING">Pending</option>
              <option value="DISPATCHED">Dispatched</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          </td>
          <td class="py-2 px-4">
            <select
              name="payment-status"
              id="payment-status"
              class="bg-white px-4 border border-rounded-full border-green-500 text-green-500 py-2 rounded-lg"
              data-id="${orderData.id}"
            >
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
            </select>
          </td>
          <td class="py-2 px-4">${orderData.address}</td>
    </tr>
    `;

  return markup;
}
