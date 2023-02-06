export interface UserData {
  isInvoiceNeeded: boolean;
  userName: string;
  userLastName: string;
  userPhoneNumber?: string;
  userMail: string;
  userMailConfirmation: string;
  userInvoiceForm?: UserInvoiceForm;
  userNewsletter: boolean;
  discountCode?: string;
}

export interface UserInvoiceForm {
  userNIP: string;
  userStreet: string;
  userPostCode: string;
  userCity: string;
}

export interface Order {
  id: number;
  userName: string;
  userLastName: string;
  userMail: string;
  discountCode: string | undefined;
  userPhoneNumber: string | undefined;
  invoice: Invoice[];
  date: string;
  paied: boolean;
  userId?: number;
}

export interface Invoice {
  id: number;
  address: Address[];
  nip: string;
}

export interface Address {
  id: number;
  street: string;
  local: string;
  postcode: string;
  city: string;
}
