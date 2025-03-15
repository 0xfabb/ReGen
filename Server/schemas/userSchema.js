const zod = require("zod");

const userSchemaRegister = zod.object({
  fullname: zod.string().min(3),
  email: zod.string().email(),
  password: zod.string().min(3),
  mobile: zod.string().length(10),
});

const userSchemaLogin = zod.object({
  email: zod.string().email(),
  password: zod.string().min(3),
});

module.exports = { userSchemaRegister, userSchemaLogin };
