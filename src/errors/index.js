'use strict'

class AppError extends Error {
  constructor(type, message, status) {
    super(message)
    this.type = type
    this.status = status
  }
}

class ValidationError extends AppError {
  constructor(errors = []) {
    super('Validation', 'Invalid data format.', 400)
    this.errors = errors
  }
}

class NotFound extends AppError {
  constructor(message = 'Requested resources was not found.') {
    super('NotFound', message, 404)
  }
}

class ConflictError extends AppError {
  constructor(message = 'Entity conflict.') {
    super('Conflict', message, 409)
  }
}

class Unauthorized extends AppError {
  constructor(message = 'Not authorized.') {
    super('Unauthorized', message, 401)
  }
}


module.exports = {
  AppError,
  ValidationError,
  NotFound,
  ConflictError,
  Unauthorized,
}
