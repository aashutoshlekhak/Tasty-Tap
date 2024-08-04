import prisma from "../db/prisma.db";
import {
  delivery_status,
  IOrder,
  PaymentStatus,
} from "../interface/order.interface";

export function createOrder(order: IOrder) {
  const { user_id, menu_id, payment_status, delivery_status, quantity } = order;
  if (order.quantity! < 1) {
    return;
  }

  return prisma.order.create({
    data: {
      user_id,
      menu_id,
      payment_status,
      delivery_status,
      quantity,
    },
  });
}

export function findOrderById(id: number) {
  return prisma.order.findUnique({
    where: { id },
    select: {
      id: true,
      delivery_status: true,
      payment_status: true,
      user: {
        select: {
          username: true,
          address: true,
        },
      },
      menu_items: {
        select: {
          name: true,
          image_url: true,
        },
      },
    },
  });
}

export function getAllOrders() {
  return prisma.order.findMany({
    select: {
      id: true,
      delivery_status: true,
      payment_status: true,
      quantity: true,
      user: {
        select: {
          username: true,
          address: true,
        },
      },
      menu_items: {
        select: {
          name: true,
          image_url: true,
        },
      },
    },
  });
}

export function getOrdersByUserAddress(address: string) {
  //I will create an array here which contains strings with four consequtive letters of the the given address
  const addressSubstringArr: string[] = [];
  if (address.length < 4) {
    addressSubstringArr.push(address);
  } else {
    for (let i = 0; i < address.length - 3; i++) {
      addressSubstringArr.push(address.substring(i, i + 4));
    }
  }

  const orConditions = addressSubstringArr.map((subStr) => {
    return {
      user: {
        address: {
          contains: subStr,
          mode: "insensitive",
        },
      },
    };
  });

  //Building the OR condition with all possible substrings
  return prisma.order.findMany({
    where: {
      OR: orConditions as any,
    },
    select: {
      id: true,
      delivery_status: true,
      payment_status: true,
      user: {
        select: {
          username: true,
          address: true,
        },
      },
      menu_items: {
        select: {
          name: true,
          image_url: true,
        },
      },
    },
  });
}

export function getOrderByUsername(username: string) {
  return prisma.order.findMany({
    where: {
      user: {
        username: username,
      },
    },
    select: {
      id: true,
      delivery_status: true,
      payment_status: true,
      user: {
        select: {
          username: true,
          address: true,
        },
      },
    },
  });
}

//to get order by menu name
export function getOrderByMenuName(menuName: string) {
  return prisma.order.findMany({
    where: {
      menu_items: {
        name: menuName,
      },
    },
    select: {
      id: true,
      delivery_status: true,
      payment_status: true,
      user: {
        select: {
          username: true,
          address: true,
        },
      },
      menu_items: {
        select: {
          name: true,
          image_url: true,
        },
      },
    },
  });
}

export function searchOrder(searchParam: string) {
  return prisma.order.findMany({
    where: {
      OR: [
        {
          user: {
            username: {
              contains: searchParam,
              mode: "insensitive",
            },
          },
        },
        {
          menu_items: {
            name: {
              contains: searchParam,
              mode: "insensitive",
            },
          },
        },
        {
          user: {
            address: {
              contains: searchParam,
              mode: "insensitive",
            },
          },
        },
        {
          user: {
            full_name: {
              contains: searchParam,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    select: {
      id: true,
      delivery_status: true,
      payment_status: true,
      user: {
        select: {
          username: true,
          address: true,
        },
      },
      menu_items: {
        select: {
          name: true,
          image_url: true,
        },
      },
    },
  });
}

export function deleteOrder(id: number) {
  return prisma.order.delete({
    where: {
      id,
    },
  });
}

export function updateOrderPaymentStatus(
  id: number,
  payment_status: PaymentStatus
) {
  return prisma.order.update({
    where: {
      id,
    },
    data: {
      payment_status,
    },
  });
}

export function updateDeliveryStatus(
  id: number,
  delivery_status: delivery_status
) {
  return prisma.order.update({
    where: {
      id,
    },
    data: {
      delivery_status,
    },
  });
}
