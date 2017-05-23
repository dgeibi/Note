function Events() {
  this.listeners = {};
}

function on(type, fn) {
  if (!type) throw Error('type require');
  if (typeof fn !== 'function') throw Error('listener required');
  if (!this.listeners[type]) {
    this.listeners[type] = [];
  }
  this.listeners[type].push(fn);
}

function remove(type, fn) {
  if (!type) throw Error('type require');
  const listeners = this.listeners[type];
  if (!listeners) return;
  if (typeof fn !== 'function') {
    this.listeners[type] = [];
  } else {
    listeners.forEach((listener, index) => {
      if (listener !== fn) return;
      listeners.splice(index, 1);
    });
  }
}

function emit(type, ...args) {
  const listeners = this.listeners[type];
  if (!listeners) return;
  listeners.forEach((fn) => {
    fn(...args);
  });
}

Events.prototype.emit = emit;
Events.prototype.on = on;
Events.prototype.remove = remove;
Events.prototype.addListener = on;
Events.prototype.removeListener = remove;

export default Events;
