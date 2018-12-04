'use strict'
const { deprecate } = require('electron')
const contentTracing = process.electronBinding('content_tracing')
const { markPromisified } = require('@electron/internal/common/promise-utils')

// Mark promisifed APIs
markPromisified(contentTracing.getCategories)
markPromisified(contentTracing.startRecording)
markPromisified(contentTracing.stopRecording)
markPromisified(contentTracing.getTraceBufferUsage)

contentTracing.getCategories = deprecate.promisify(contentTracing.getCategories)
contentTracing.startRecording = deprecate.promisify(contentTracing.startRecording)
contentTracing.stopRecording = deprecate.promisify(contentTracing.stopRecording)
contentTracing.getTraceBufferUsage = deprecate.promisifyMultiArg(
  contentTracing.getTraceBufferUsage
  // convertPromiseValue: Temporarily disabled until it's used
  /* (value) => [value.paths, value.bookmarks] */
)

module.exports = contentTracing
