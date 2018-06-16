let terms = [
  "Car Accessories",
  "Cars",
  "Motorcycles",
  "Other Vehicles",
  "Trucks & buses",
  "TV - Audio - Video",
  "Computers - Tablets",
  "Video games - Consoles",
  "Cameras - Imaging",
  "Home Appliances",
  "Properties for Rent",
  "Properties for Sale",
  "Premium Properties for Rent",
  "Premium Properties for Sale",
  "Mobile Phones",
  "Mobile Accessories",
  "Decoration - Accessories",
  "Furniture",
  "Garden - Outdoor",
  "Kitchenware",
  "Other Home & Garden",
  "Clothes for Kids and Babies",
  "Toys",
  "Cribs - Strollers",
  "Accessories",
  "Other Kids & Babies",
  "Sporting Goods",
  "Bikes",
  "Outdoor Equipment",
  "Antiques - Collectibles",
  "Books",
  "Movies - Music",
  "Musical instruments",
  "Other items",
  "Study tools",
  "Tickets - Vouchers",
  "Factories Equipment",
  "Medical Equipment",
  "Heavy Equipment",
  "Restaurants Equipments",
  "Shops Liquidation",
  "Other Business & Industrial",
  "Business Services",
  "Car Repairs",
  "Domestic Services",
  "Events",
  "Home",
  "Movers",
  "Other Services",
  "Personal Services",
  "Pets",
  "Private Tutors"
];
let res = [];

const constructorFunction = term => {
  let obj = {};
  obj.value = term;
  obj.label = term;

  res.push(obj);
};

terms.map(e => constructorFunction(e));

export default res;
