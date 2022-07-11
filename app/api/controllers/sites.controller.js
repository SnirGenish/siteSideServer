import { Site } from "../models/siteModel.js";
export const addSite = async (req, res) => {
  const site = new Site({
    owner: {
      id: req.user._id,
    },
    username: req.user.userName,
    ...req.body,
  });
  try {
    await site.save();
    return res.status(200).send(site);
  } catch (err) {
    res.send(err);
  }
};
export const getSite = async (req, res) => {
  try {
    const site = await Site.findOne({
      username: req.params.userName,
      title: req.params.siteName,
    });
    if (!site) {
      return res.status(404).send("Site not found");
    }
    res.send(site);
  } catch (err) {
    res.send(err);
  }
};
export const updateSite = async (req, res) => {
  try {
    const site = await Site.findOneAndUpdate(
      { _id: req.params.id, owner: { id: req.user._id.toString() } },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!site) {
      return res.status(404).send();
    }
    res.send(site);
  } catch (err) {
    res.send(err);
  }
};
export const deleteSite = async (req, res) => {
  try {
    const site = await Site.findOneAndDelete({
      _id: req.params.id,
      owner: { id: req.user._id.toString() },
    });
    console.log(req.params.id, req.user._id);
    res.send(site);
  } catch (err) {
    res.send(err);
  }
};
