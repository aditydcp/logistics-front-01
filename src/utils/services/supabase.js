import { createClient } from '@supabase/supabase-js'
import { getPageItemLimit } from "../helpers/apply-pagination"
import { id } from 'date-fns/locale'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const  countAll = async (table) => {
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true })

  return { count, error }
}

const countById = async (table, id) => {
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true })
    .eq('id', id)

  return { count, error }
}

const countByFields = async (table, fields) => {
  let query = supabase.from(table).select('*', { count: 'exact', head: true })

  Object.entries(fields).forEach(([field, value]) => {
    query = query.eq(field, value)
  })

  const { count, error } = await query

  return { count, error }
}

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

const getByFields = async (table, fields) => {
  let query = supabase.from(table).select()

  Object.entries(fields).forEach(([field, value]) => {
    query = query.eq(field, value)
  })

  const { data, error } = await query

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

const updateByField = async (table, field, value, object) => {
  const { data, error } = await supabase
    .from(table)
    .update(object)
    .eq(field, value)
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

const deleteByField = async (table, field, value) => {
  const { data, error } = await supabase
    .from(table)
    .delete()
    .eq(field, value)
    .select()

  return { data, error }
}

const searchFlights = async (
  departureDate,
  departureAirport,
  arrivalAirport,
  weight = null,
  size = null,
  category_ids = [],
  packaging_ids = [],
) => {
  const { data, error } = await supabase
    .rpc('get_flight_tickets_details', {
      p_departure_airport_id: departureAirport,
      p_arrival_airport_id: arrivalAirport,
      p_departure_date: new Date(departureDate).toISOString().split('T')[0],
      p_weight: weight || null,
      p_size: size || null,
      p_category_ids: category_ids.length > 0 ? category_ids : null,
      p_packaging_ids: packaging_ids.length > 0 ? packaging_ids : null
    });

  return { data, error }
}

const searchFlightById = async (id) => {
  const { data, error } = await supabase
    .rpc('get_flight_ticket_details', {
      p_ticket_id : id
    });

  return { data, error }
}

const getBookings = async (
  userId,
  page = 0,
  rowsPerPage = 10,
  sortColumn = 'status',
  sortDirection = 'asc'
) => {
  const { data, error } = await supabase
    .rpc('get_bookings_details', {
      p_user_id : userId,
      p_page : page,
      p_rows_per_page : rowsPerPage,
      p_sort_column : sortColumn,
      p_sort_direction : sortDirection
    })
  
  return { data, error }
}

export {
  countAll,
  countById,
  countByFields,
  getAll,
  getAllFromPage,
  getById,
  getByFields,
  createItem,
  updateItem,
  updateByField,
  deleteItem,
  deleteByField,
  searchFlights,
  searchFlightById,
  getBookings,
}