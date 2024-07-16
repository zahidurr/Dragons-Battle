const Joi = require("joi");
const dragons = require("../dragons.json");

const dragonCache = {};
dragons.forEach((dragon) => {
  dragonCache[dragon.id] = dragon;
});

const validateDragonIds = (req, res, next) => {
  const schema = Joi.object({
    dragon1Id: Joi.number().required(),
    dragon2Id: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { dragon1Id, dragon2Id } = req.body;

  const dragon1 = dragonCache[dragon1Id];
  const dragon2 = dragonCache[dragon2Id];

  if (!dragon1 || !dragon2) {
    return res.status(404).json({ error: "One or both dragon IDs not found" });
  }

  req.dragon1 = dragon1;
  req.dragon2 = dragon2;

  next();
};

module.exports = validateDragonIds;
