const { templateService } = require("../services");
const addTemplate = async (req, res) => {
  const template = await templateService.addTemplate(req.body);

  return res.status(201).json({
    message: "template successfully created",
  });
};
const getTemplates = async (req, res) => {
  const templates = await templateService.getTemplates();

  return res.status(200).json({
    message: "template's",
    Data: templates,
  });
};

const updateTemplate = async (req, res) => {
  const updatedTemp = await templateService.updateTemplate(
    req.params.templateId,
    req.body
  );
  return res.status(200).json({
    message: "template updated successfully!",
  });
};
const deleteTemplate = async (req, res) => {
  const deletedTemplate = await templateService.deleteTemplate(
    req.params.templateId
  );
  return res.status(200).json({
    message: "templated deleted successfully!",
  });
};

module.exports = {
  addTemplate,
  getTemplates,
  updateTemplate,
  deleteTemplate,
};
