const replacePlaceholders = async (template, params) => {
  Object.keys(params).forEach((key) => {
    const placeHolder = `{{${key}}}`;
    template = template.replace(new RegExp(placeHolder, "g"), params[key]);
  });
  return template;
};

module.exports = {
  replacePlaceholders,
};
