'use strict'

const { EventEmitter } = require('events')
const { app, deprecate } = require('electron')
const { fromPartition, Session, Cookies, NetLog, Protocol } = process.electronBinding('session')

const { markPromisified } = require('@electron/internal/common/promise-utils')

// Public API.
Object.defineProperties(exports, {
  defaultSession: {
    enumerable: true,
    get () { return fromPartition('') }
  },
  fromPartition: {
    enumerable: true,
    value: fromPartition
  }
})

Object.setPrototypeOf(Session.prototype, EventEmitter.prototype)
Object.setPrototypeOf(Cookies.prototype, EventEmitter.prototype)

Session.prototype._init = function () {
  app.emit('session-created', this)
}

// Mark promisifed APIs
markPromisified(Session.prototype.clearStorageData)
markPromisified(Session.prototype.clearHostResolverCache)
markPromisified(Session.prototype.resolveProxy)
markPromisified(Session.prototype.setProxy)
markPromisified(Session.prototype.getCacheSize)
markPromisified(Session.prototype.clearCache)
markPromisified(Session.prototype.clearAuthCache)
markPromisified(Session.prototype.getBlobData)

markPromisified(Cookies.prototype.flushStore)
markPromisified(Cookies.prototype.get)
markPromisified(Cookies.prototype.remove)
markPromisified(Cookies.prototype.set)

markPromisified(NetLog.prototype.stopLogging)

markPromisified(Protocol.prototype.isProtocolHandled)

Session.prototype.clearStorageData = deprecate.promisify(Session.prototype.clearStorageData)
Session.prototype.clearHostResolverCache = deprecate.promisify(Session.prototype.clearHostResolverCache)
Session.prototype.resolveProxy = deprecate.promisify(Session.prototype.resolveProxy)
Session.prototype.setProxy = deprecate.promisify(Session.prototype.setProxy)
Session.prototype.getCacheSize = deprecate.promisify(Session.prototype.getCacheSize)
Session.prototype.clearCache = deprecate.promisify(Session.prototype.clearCache)
Session.prototype.clearAuthCache = deprecate.promisify(Session.prototype.clearAuthCache)
Session.prototype.getBlobData = deprecate.promisifyMultiArg(Session.prototype.getBlobData)

Cookies.prototype.flushStore = deprecate.promisify(Cookies.prototype.flushStore)
Cookies.prototype.get = deprecate.promisify(Cookies.prototype.get)
Cookies.prototype.remove = deprecate.promisify(Cookies.prototype.remove)
Cookies.prototype.set = deprecate.promisify(Cookies.prototype.set)

NetLog.prototype.stopLogging = deprecate.promisify(NetLog.prototype.stopLogging)

Protocol.prototype.isProtocolHandled = deprecate.promisify(Protocol.prototype.isProtocolHandled)
