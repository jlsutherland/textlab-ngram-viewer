/**
 * Timeseries model events
 */

'use strict';

import {EventEmitter} from 'events';
import Timeseries from './timeseries.model';
var TimeseriesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TimeseriesEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Timeseries.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TimeseriesEvents.emit(event + ':' + doc._id, doc);
    TimeseriesEvents.emit(event, doc);
  };
}

export default TimeseriesEvents;
