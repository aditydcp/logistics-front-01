import { createClient } from '@supabase/supabase-js'
import { getPageItemLimit } from "../helpers/apply-pagination"

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const getAll = async (table) => {
  const { data, error } = await supabase
      .from(table)
      .select()
  
  return { data, error }
}

const getAllFromPage = async (table, page, rowsPerPage) => {
  const { start, end } = getPageItemLimit(page, rowsPerPage)
  const { data, error } = await supabase
      .from(table)
      .select()
      .range(start, end)
  
  return { data, error }
}

const getById = async (table, id) => {
  const { data, error } = await supabase
      .from(table)
      .select()
      .eq('id', id)
  
  return { data, error }
}

const createItem = async (table, object) => {
  const { data, error } = await supabase
      .from(table)
      .insert([object])
      .select()

  return { data, error }
}

const updateItem = async (table, id, object) => {
  const { data, error } = await supabase
      .from(table)
      .update(object)
      .eq('id', id)
      .select()
  
  return { data, error }
}

const deleteItem = async (table, id) => {
  const { data, error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
      .select()

  return { data, error }
}

export {
  getAll,
  getAllFromPage,
  getById,
  createItem,
  updateItem,
  deleteItem
}