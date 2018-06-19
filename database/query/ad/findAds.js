const Ad = require("../../model/ad");

const QueryBuilder = (term, category, priceFrom, priceTo, country, region) => {
  let query = [];
  if (term) {
    query.push({ $text: { $search: term } });
  }
  if (category) {
    query.push({ category: category });
  }
  if (!isNaN(priceFrom)) {
    if (!isNaN(priceTo) && priceTo > priceFrom) {
      query.push({
        price: {
          $gte: priceFrom,
          $lte: priceTo
        }
      });
      return;
    }
    query.push({
      price: {
        $gte: priceFrom
      }
    });
  }
  if (!isNaN(priceTo) && isNaN(priceFrom)) {
    query.push({
      price: {
        $lte: priceTo
      }
    });
  }
  if (country) {
    query.push({
      country: country
    });
  }
  if (region) {
    query.push({
      region: region
    });
  }
  return query;
};

module.exports = (params, _id) => {
  if (_id) {
    return Ad.findById(_id)
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "user"
        }
      })
      .populate({
        path: "user",
        populate: {
          path: "user",
          model: "user"
        }
      });
  }
  let sort = {};
  if (!params.order) {
    params.order = 1;
  }
  if (!params.skip) {
    params.skip = 0;
  }
  if (params.sortBy === "relevance" && !!params.term) {
    sort.score = { $meta: "textScore" };
  } else {
    sort[params.sortBy] = parseFloat(params.order);
  }

  const query = QueryBuilder(
    params.term,
    params.category,
    parseFloat(params.priceFrom),
    parseFloat(params.priceTo),
    params.country,
    params.region
  );
  if (query.length > 0) {
    return Promise.all([
      Ad.find({ $and: query }, { score: { $meta: "textScore" } })
        .sort(sort)
        .skip(parseFloat(params.skip))
        .limit(12),
      Ad.find({ $and: query }, { score: { $meta: "textScore" } }).count()
    ]);
  }
  return Promise.all([
    Ad.find()
      .sort(sort)
      .skip(parseFloat(params.skip))
      .limit(12),
    Ad.count()
  ]);
};
