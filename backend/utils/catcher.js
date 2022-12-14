const catcher = (fun) => {
  const toReturn = async (req, res, next) => {
    try {
      await fun(req, res, next);
      console.log('✅ Success');
    } catch (err) {
      console.log('❌ Error');
      next(err);
    }
  };
  return toReturn;
};

module.exports = catcher;
