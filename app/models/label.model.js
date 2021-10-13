const mongoose = require("mongoose");
const labelSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

  labelName: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

const LabelRegister = mongoose.model("labelRegister", labelSchema);

class Model {
    createLabel = (data) => {
      return new Promise((resolve, reject) => {
        const label = new LabelRegister({
          userId: data.userId,
          labelName: data.labelName
        });
        label.save().then((data) => resolve(data))
          .catch((error) => reject(error));
      });
    }

    getLabel = (id) => {
      return new Promise((resolve, reject) => {
        LabelRegister.find({ userId: id }).then((data) => {
          resolve(data);
        })
          .catch((error) => reject(error));
      });
    }

    getLabelById = (id) => {
      return new Promise((resolve, reject) => {
        LabelRegister.findById(id).then((data) => {
          resolve(data);
        }).catch((err) => reject(err));
      });
    }

    async updateLabel (label) {
      try {
        return await LabelRegister.findByIdAndUpdate(label.labelId, { labelName: label.labelName }, { new: true });
      } catch (err) {
        return err;
      }
    }
}
module.exports = new Model();
