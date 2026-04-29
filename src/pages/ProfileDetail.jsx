import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import api from '../utils/api'
import { useAuth } from '../hooks/useAuth'

function ProfileDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const { data, isLoading, error } = useQuery(
    ['profile', id],
    async () => {
      const response = await api.get(`/api/profiles/${id}`)
      return response.data
    }
  )

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this profile?')) return
    
    try {
      await api.delete(`/api/profiles/${id}`)
      navigate('/profiles')
    } catch (err) {
      alert('Failed to delete profile')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Profile not found
      </div>
    )
  }

  const profile = data?.data

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile Details</h1>
        {user?.role === 'admin' && (
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Profile
          </button>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID</label>
            <p className="mt-1 text-sm text-gray-900">{profile.id}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-sm text-gray-900">{profile.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <p className="mt-1 text-sm text-gray-900">
              {profile.gender} ({(profile.gender_probability * 100).toFixed(1)}% confidence)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <p className="mt-1 text-sm text-gray-900">
              {profile.age} years old ({profile.age_group})
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <p className="mt-1 text-sm text-gray-900">
              {profile.country_id} - {profile.country_name || 'N/A'}
            </p>
            <p className="text-sm text-gray-500">
              {(profile.country_probability * 100).toFixed(1)}% confidence
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Created</label>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(profile.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate('/profiles')}
            className="text-blue-600 hover:text-blue-900"
          >
            ← Back to Profiles
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetail
