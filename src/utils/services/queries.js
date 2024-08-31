import * as db from './supabase'

export const countAll = async (table) => {
  return await db.countAll(table)
}

export const countById = async (table, id) => {
  return await db.countById(table, id)
}

export const countByFields = async (table, fields) => {
  return await db.countByFields(table, fields)
}

export const getAll = async (table) => {
  return await db.getAll(table)
}

export const getAllFromPage = async (table, page, rowsPerPage) => {
  return await db.getAllFromPage(table, page, rowsPerPage)
}

export const getById = async (table, id) => {
  return await db.getById(table, id)
}

export const getByFields = async (table, fields) => {
  return await db.getByFields(table, fields)
}

export const createItem = async (table, object) => {
  return await db.createItem(table, object)
}

export const updateItem = async (table, id, object) => {
  return await db.updateItem(table, id, object)
}

export const updateByField = async (table, field, value, object) => {
  return await db.updateByField(table, field, value, object)
}

export const deleteItem = async (table, id) => {
  return await db.deleteItem(table, id)
}

export const deleteByField = async (table, field, value) => {
  return await db.deleteByField(table, field, value)
}

// custom queries
export const searchFlights = async (
  departureDate,
  departureAirport,
  arrivalAirport,
  weight = null,
  size = null,
  category_ids = [],
  packaging_ids = [],
) => {
  return await db.searchFlights(
    departureDate,
    departureAirport,
    arrivalAirport,
    weight,
    size,
    category_ids,
    packaging_ids,
  )
}

export const searchFlightById = async (id) => {
  return await db.searchFlightById(id)
}

export const getBookings = async (
  userId,
  page = 1,
  rowsPerPage = 10,
  sortColumn = 'status',
  sortDirection = 'asc'
) => {
  return await db.getBookings(
    userId,
    page,
    rowsPerPage,
    sortColumn,
    sortDirection
  )
}