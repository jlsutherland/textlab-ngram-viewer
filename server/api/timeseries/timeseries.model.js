'use strict';

import mongoose from 'mongoose';

var TimeseriesSchema = new mongoose.Schema({
  ngram: String,
  freqs: [Number]
});

export default mongoose.model('Timeseries', TimeseriesSchema);
