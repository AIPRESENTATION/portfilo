import SocialLinks from '../models/SocialLinks.js';

export const getSocialLinks = async (req, res, next) => {
  try {
    let links = await SocialLinks.findOne();
    if (!links) {
      links = await SocialLinks.create({});
    }
    res.json({ success: true, data: links });
  } catch (error) {
    next(error);
  }
};

export const updateSocialLinks = async (req, res, next) => {
  try {
    let links = await SocialLinks.findOne();
    if (!links) {
      links = await SocialLinks.create(req.body);
    } else {
      links = await SocialLinks.findByIdAndUpdate(links._id, req.body, {
        new: true,
        runValidators: true,
      });
    }
    res.json({ success: true, data: links });
  } catch (error) {
    next(error);
  }
};
