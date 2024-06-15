const mongoose = require("mongoose");
const slugify = require("slugify");

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Danh mục quốc gia phải có tên"],
      unique: true,
      trim: true,
    },
    slug: String,
  },
  { timestamps: true }
);

countrySchema.pre("save", function (next) {
  this.name = this.name.replace(/(^|\s)\S/g, (char) => char.toUpperCase());
  this.slug = slugify(this.name, { lower: true });
  next();
});

countrySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.name = update.name.replace(/(^|\s)\S/g, (char) =>
      char.toUpperCase()
    );
    update.slug = slugify(update.name, { lower: true });
  }
  next();
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
