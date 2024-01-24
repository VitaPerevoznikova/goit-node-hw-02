// PerevoznikovaV    frayvita
// iTnXbEGzWZdAimV4  3ZLW0uJnTIDytTEe

const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    "-createdAt -updatedAt",
    { skip, limit: Number(limit) }
  ).populate("owner", "email subscription");
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: id, owner });
  if (result === null) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};
const remove = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: id, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};
const updateById = async (req, res) => {
  const body = req.body;
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
const updateStatusContact = async (req, res) => {
  const body = req.body;
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const { id } = req.params;
  const { favorite } = req.body;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner },
    { favorite },
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  remove: ctrlWrapper(remove),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};