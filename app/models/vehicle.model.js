module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description:String,
      latitude: String,
      longitude: String,
      latitudet: String,
      longitudet: String,
      model: String,
      year: String,
      licensen: String,
      chassisn: String,
      mileage: String,
      fuelt:String,
    },
    { timestamps: true }
  );
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Vehicle = mongoose.model("vehicle", schema);
  return Vehicle;
};