import { ICustomer } from "../../../interface/user.interface";

export function generateCustomerRow(customerData: ICustomer) {
  const markup = `
        <tr class="border-b">
                <td class="py-2 px-4">${customerData.id}</td>
                <td class="py-2 px-4">${customerData.username}</td>
                <td class="py-2 px-4">${customerData.email}</td>
                <td class="p-4">${customerData.full_name}</td>
                <td class="py-2 px-4">${customerData.address}</td>
                <td class="py-2 px-4">
                    <button
                    data-id="${customerData.id}"
                    class="customer-details bg-teal-200 text-neutral-700 px-4 py-2 rounded-lg hover:bg-teal-400 hover:text-white transition-all duration-300"
                    >
                    Details
                    </button>
                </td>
        </tr>
    `;

  return markup;
}

export function generateCustomerInfoRow(customerData: ICustomer) {
  const markup = `
    <div
        id="overlay"
        class="fixed top-0 left-0 w-full h-full backdrop-blur-sm z-20 bg-black/20 transition-all duration-300 flex justify-center items-center"
    >
        <div
        id="customer-details"
        class="w-[500px] flex flex-col rounded-md p-4 z-30 bg-white items-center relative"
        >
        <div class="absolute top-0 right-0 p-1" id="close-user-modal">
            <button
            class="bg-orange-500 text-red-50 px-2 py-1 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
            >
            <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <div
            class="image-container flex items-center justify-center rounded-full w-24 h-24 border-4 border-orange-300 overflow-hidden relative"
        >
            <img
            src="${customerData.profile_picture}"
            alt=""
            class="object-fill"
            />
        </div>

        <div class="flex justify-center items-center w-full mb-4">
            <table class="w-2/3 mt-4 text-left">
            <tr class="border-b">
                <th class="text-orange-500">name</th>
                <td class="text-right text-neutral-700 font-normal">${customerData.full_name}</td>
            </tr>
            <tr class="border-b">
                <th class="text-orange-500">username</th>
                <td class="text-right text-neutral-700 font-normal">${customerData.username}</td>
            </tr>
            <tr class="border-b">
                <th class="text-orange-500">email</th>
                <td class="text-right text-neutral-700 font-normal">${customerData.email}</td>
            </tr>
            <tr class="border-b">
                <th class="text-orange-500">contact</th>
                <td class="text-right text-neutral-700 font-normal">${customerData.contact}</td>
            </tr>
            <tr class="border-b">
                <th class="text-orange-500">address</th>
                <td class="text-right text-neutral-700 font-normal">${customerData.address}</td>
            </tr>
            </table>
        </div>
        <div class="w-full flex justify-center">
            <button
            id="delete-user"
            class="customer-details bg-orange-500 text-red-50 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
            >
            Delete User
            </button>
        </div>
        </div>
    </div>

    `;
  return markup;
}
