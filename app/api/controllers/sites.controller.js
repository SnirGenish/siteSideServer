import { Site } from "../models/siteModel.js";
import { User } from "../models/userModel.js";
export const addSite = async (req, res) => {
  const site = new Site({
    owner: {
      id: req.user._id,
    },
    username: req.user.userName,
    ...req.body,
  });
  const user = await User.findByIdAndUpdate(req.user._id, {
    $push: {
      sites: {
        id: site._id,
        logo: site.logo,
        title: site.title,
        color: site.color[2],
        font: site.font,
      },
    },
  });
  try {
    await site.save();
    if (site) {
      await user.save();
    }
    res.status(200).send(site);
  } catch (err) {
    res.status(400).send(err);
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
    const user = await User.findByIdAndUpdate(req.user._id, {
      $set: {
        sites: {
          id: site._id,
          logo: site.logo,
          title: site.title,
        },
      },
    });
    if (!site) {
      return res.status(404).send();
    }
    await user.save();
    await site.save();
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
    const user = await User.findByIdAndUpdate(req.user._id, {
      $pull: { sites: { id: site._id } },
    });
    if (!site) {
      return res.status(404).send();
    }
    await user.save();
    await site.save();

    res.send(site);
  } catch (err) {
    res.send(err);
  }
};
