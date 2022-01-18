const fastify = require("fastify")({ logger: true });
const { connect } = require("./db");
const Product = require("./products");

fastify.register(require("fastify-cors"), function (instance) {
  return (req, callback) => {
    const corsOptions = { origin: true };
    callback(null, corsOptions); // callback expects two parameters: error and options
  };
});

fastify.get("/healthcheck", async (request, reply) => {
  return { up: true };
});

const ITEMS_PER_PAGE = 20;

fastify.get("/products", async (request, reply) => {
  const page = request.query.page || 1;

  // Put all your query params in here
  const query = {};

  try {
    const skip = (page - 1) * ITEMS_PER_PAGE; // 1 * 20 = 20

    const countPromise = Product.estimatedDocumentCount(query);

    const itemsPromise = Product.find(query).limit(ITEMS_PER_PAGE).skip(skip);

    const [count, items] = await Promise.all([countPromise, itemsPromise]);

    const pageCount = count / ITEMS_PER_PAGE; // 400 items / 20 = 20

    return {
      pagination: {
        count,
        pageCount,
      },
      items,
    };
  } catch (e) {
    console.error(e);
    return e;
  }
});

const start = async () => {
  try {
    await fastify.listen(4000);
    await connect();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
