import AboutContent from '../models/AboutContent.js';

export const getAbout = async (req, res, next) => {
  try {
    let about = await AboutContent.findOne();
    if (!about) {
      about = await AboutContent.create({});
    }
    res.json({ success: true, data: about });
  } catch (error) {
    next(error);
  }
};

export const updateAbout = async (req, res, next) => {
  try {
    let about = await AboutContent.findOne();
    if (!about) {
      about = await AboutContent.create(req.body);
    } else {
      about = await AboutContent.findByIdAndUpdate(about._id, req.body, {
        new: true,
        runValidators: true,
      });
    }
    res.json({ success: true, data: about });
  } catch (error) {
    next(error);
  }
};
