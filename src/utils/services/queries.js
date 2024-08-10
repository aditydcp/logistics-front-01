import { supabase } from "./db"
import { getPageItemLimit } from "../helpers/apply-pagination"

export const getAll = async (table) => {
  const { data, error } = await supabase
      .from(table)
      .select()
  
  return { data, error }
}

export const getAllFromPage = async (table, page, rowsPerPage) => {
  const { start, end } = getPageItemLimit(page, rowsPerPage)
  const { data, error } = await supabase
      .from(table)
      .select()
      .range(start, end)
  
  return { data, error }
}

export const getById = async (table, id) => {
  const { data, error } = await supabase
      .from(table)
      .select()
      .eq('id', id)
  
  return { data, error }
}

export const createItem = async (table, object) => {
  const { data, error } = await supabase
      .from(table)
      .insert([object])
      .select()

  return { data, error }
}

export const updateItem = async (table, id, object) => {
  const { data, error } = await supabase
      .from(table)
      .update(object)
      .eq('id', id)
      .select()
  
  return { data, error }
}

export const deleteItem = async (table, id) => {
  const { data, error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
      .select()

  return { data, error }
}