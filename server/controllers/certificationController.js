import Certification from '../models/Certification.js';

export const getCertifications = async (req, res, next) => {
  try {
    const certifications = await Certification.find().sort({ order: 1 });
    res.json({ success: true, data: certifications });
  } catch (error) {
    next(error);
  }
};

export const createCertification = async (req, res, next) => {
  try {
    const certification = await Certification.create(req.body);
    res.status(201).json({ success: true, data: certification });
  } catch (error) {
    next(error);
  }
};

export const updateCertification = async (req, res, next) => {
  try {
    const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!certification) return res.status(404).json({ success: false, message: 'Certification not found' });
    res.json({ success: true, data: certification });
  } catch (error) {
    next(error);
  }
};

export const deleteCertification = async (req, res, next) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);
    if (!certification) return res.status(404).json({ success: false, message: 'Certification not found' });
    res.json({ success: true, message: 'Certification deleted' });
  } catch (error) {
    next(error);
  }
};
