import * as db from './supabase'

export const getAll = async (table) => {
  return await db.getAll(table)
}

export const getAllFromPage = async (table, page, rowsPerPage) => {
  return await db.getAllFromPage(table, page, rowsPerPage)
}

export const getById = async (table, id) => {
  return await db.getById(table, id)
}

export const getByField = async (table, field, value) => {
  return await db.getByField(table, field, value)
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