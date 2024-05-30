let updatebatchFile = async (req, res) => {
    try {
      const employeeDetail = await batchFileDataModel.findById(req.params.id);
  
      // Check for ObjectId format and post
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !employeeDetail) {
        return res.status(204).json({ message: 'employee details not found!' });
      }
  
      res.status(200).json(employeeDetail);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
};