export interface UserOrders {
  id: number;
  userName: string;
  userLastName: string;
  userMail: string;
  discountCode: string;
  userPhoneNumber: string;
  userInvoiceForm: UserOrdersInvoice;
  paiedAt: string;
  ticket: UserOrdersTicket[];
  userId: number;
}

export interface UserOrdersInvoice {
  userNIP: string;
  userStreet: string;
  userPostCode: string;
  userCity: string;
}

export interface UserOrdersTicket {
  id: number;
  showId: number;
  movieTitle: string;
  date: string;
  hour: string;
  screen: string;
  seat: UserOrdersSeat;
}

export interface UserOrdersSeat {
  position: string;
  type: string;
  price: number;
  special: boolean;
}
