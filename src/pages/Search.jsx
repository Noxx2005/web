import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import api from '../utils/api'

function Search() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [searchTriggered, setSearchTriggered] = useState(false)

  const { data, isLoading, error } = useQuery(
    ['search', query, page],
    async () => {
      const response = await api.get('/api/profiles/search', {
        params: { q: query, page, limit: 10 }
      })
      return response.data
    },
    {
      enabled: searchTriggered && query.length > 0,
      keepPreviousData: true
    }
  )

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    setSearchTriggered(true)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Natural Language Search</h1>

      {/* Search Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: young males from nigeria, females above 30, adult males from kenya"
            className="flex-1 border rounded-md px-4 py-2 text-lg"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          <p className="font-medium mb-2">Example queries:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>"young males from nigeria"</li>
            <li>"females above 30"</li>
            <li>"adult males from kenya"</li>
            <li>"senior women"</li>
            <li>"teenagers from ghana"</li>
          </ul>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error.response?.data?.message || 'Search failed. Please try again.'}
        </div>
      )}

      {/* Results */}
      {searchTriggered && !isLoading && data && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Results for "{query}" ({data.total} found)
            </h2>
          </div>

          {data.data?.length > 0 ? (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.data.map((profile) => (
                    <tr key={profile.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/profiles/${profile.id}`} className="text-blue-600 hover:text-blue-900">
                          {profile.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {profile.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {profile.age} ({profile.age_group})
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {profile.country_id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Page {data.page} of {data.total_pages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={page >= data.total_pages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No profiles found matching your query
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Search
