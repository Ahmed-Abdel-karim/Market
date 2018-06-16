import category from "./categoryList";
export const formLables = [
  {
    name: "title",
    label: "Title",
    type: "text",
    className: "input-field col s12 m6",
    icon: "assignment"
  },
  {
    name: "price",
    type: "number",
    label: "Price",
    className: "input-field col s12 m6",
    icon: "attach_money"
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    className: "input-field col s12",
    icon: "description"
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: category,
    className: "col s12"
  },
  {
    name: "tags",
    label: "Tags",
    type: "tags",
    className: "col s12"
  },
  {
    name: "brand",
    label: "Brand",
    type: "text",
    className: "input-field col s12",
    icon: "branding_watermark"
  },
  {
    name: "cover",
    label: "Cover",
    type: "file",
    className: "input-field col s12 m4",
    icon: "photo_library"
  },
  {
    name: "image_1",
    label: "Image",
    type: "file",
    className: "input-field col s12 m4",
    icon: "photo_library"
  },
  {
    name: "image_2",
    label: "Image",
    type: "file",
    className: "input-field col s12 m4",
    icon: "photo_library"
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    className: "input-field col s12 m6 clearfix",
    icon: "email"
  },
  {
    name: "phone_number",
    label: "Phone number",
    className: "input-field col s12 m6",
    icon: "local_phone",
    type: "number"
  },
  {
    name: "country",
    label: "country",
    type: "country",
    className: "col s12 m6 l6 xl6"
  },
  {
    name: "region",
    label: "region",
    type: "region",
    className: "col s12 m6 l6 xl6"
  },
  {
    name: "address",
    label: "Address",
    type: "address",
    className: "input-field col s12",
    icon: "location_on"
  }
];
export const loginLabels = [
  {
    name: "email",
    type: "email",
    label: "email",
    icon: "contact_mail"
  },
  {
    name: "password",
    type: "password",
    label: "password",
    icon: "lock_outline"
  }
];
export const registerLabels = [
  {
    name: "name",
    type: "text",
    label: "username",
    icon: "assignment_ind"
  },
  {
    name: "email",
    type: "email",
    label: "email",
    icon: "contact_mail"
  },
  {
    name: "password",
    type: "password",
    label: "password",
    icon: "lock_outline"
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "confirm password",
    icon: "lock_outline"
  }
];
