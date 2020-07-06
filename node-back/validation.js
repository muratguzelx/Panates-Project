const validator = require('validator');

exports.validateList = (data) => {
  const { startDate, endDate } = data;
  const errors = {};

  if (isEmpty(startDate)) {
    errors.startDate = 'startDate is required';
  }
  else {
    if (!validator.isISO8601(startDate)) {
      errors.startDate = 'startDate must be in YYYY-MM-DD format';
    }
  }

  if (isEmpty(endDate)) {
    errors.endDate = 'endDate is required';
  }
  else {
    if (!validator.isISO8601(data.endDate)) {
      errors.endDate = 'endDate must be in YYYY-MM-DD format';
    }
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

exports.validateContent = (data) => {
  const { _id } = data;
  const errors = {};
  if (!_id || typeof _id !== 'number') {
    errors._id = '_id is wrong';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }

}

const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object') ||
    (typeof value === 'string' && value.trim().length === 0)
  );
}

