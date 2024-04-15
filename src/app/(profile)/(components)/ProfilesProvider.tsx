'use client'
import {
  filterByAvailability,
  filterByFullName,
  filterByLocation,
  filterBySeniority,
  filterBySpecialization,
  filterByTechnology,
} from '@/app/(profile)/(components)/ProfileList/filters'
import { findAllPublishedProfiles } from '@/app/(profile)/_actions/findAllPublishedProfiles'
import { createFiltersObjFromSearchParams } from '@/app/(profile)/helpers'
import {
  type ProfileModel,
  type SearchParamsFilters,
} from '@/app/(profile)/types'
import { type ProfileView } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

// Define the context
interface ProfilesContextProps {
  allProfiles: ProfileModel[]
  filteredProfiles: ProfileModel[]
  isFetching?: boolean
  handleFilterProfiles(
    profiles: ProfileModel[],
    options?: {
      disableSpecFilter?: boolean
    },
  ): ProfileModel[]
  refreshProfilesWithProfileViews(
    viewerID: string,
    viewedProfileID: string,
    profileView: ProfileView,
  ): void
}

export const ProfilesContext = createContext<ProfilesContextProps | undefined>(
  undefined,
)

// Define the provider
export const ProfilesProvider = ({ children }: PropsWithChildren) => {
  const searchParams = useSearchParams()
  const [allProfiles, setAllProfiles] = useState<ProfileModel[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const filters: SearchParamsFilters = useMemo(
    () => createFiltersObjFromSearchParams(searchParams),
    [searchParams],
  )

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsFetching(true)
      try {
        const fetchedProfiles = await findAllPublishedProfiles()
        setAllProfiles(fetchedProfiles)
        setIsFetching(false)
      } catch (err) {
        setAllProfiles([])
        setIsFetching(false)
      }
    }

    fetchProfiles()
  }, [])

  const handleFilterProfiles = useCallback(
    (profiles: ProfileModel[], options?: { disableSpecFilter?: boolean }) => {
      const filteredProfiles = profiles
        .filter(filterBySeniority(filters.seniority))
        .filter(filterByLocation(filters.location))
        .filter(filterByTechnology(filters.technology))
        .filter(
          options?.disableSpecFilter
            ? () => true
            : filterBySpecialization(filters.specialization),
        )
        .filter(filterByAvailability(filters.availability))
        .filter(filterByFullName(filters.search[0]))
        .filter(() => true)
      return filteredProfiles
    },
    [filters],
  )

  const refreshProfilesWithProfileViews = (
    viewerID: string,
    viewedProfileID: string,
    profileView: ProfileView,
  ) => {
    setAllProfiles((prevProfiles) => {
      return prevProfiles.map((profile) => {
        if (profile.id !== viewedProfileID) return profile

        const existingProfileView = profile.profileViews.find(
          (view) => view.viewerId === viewerID,
        )

        let updatedProfileViews

        if (existingProfileView) {
          updatedProfileViews = profile.profileViews.map((view) => {
            return { ...view, createdAt: new Date() }
          })
        } else {
          updatedProfileViews = [...profile.profileViews, profileView]
        }

        return {
          ...profile,
          profileViews: updatedProfileViews,
        }
      })
    })
  }

  const filteredProfiles = handleFilterProfiles(allProfiles)

  return (
    <ProfilesContext.Provider
      value={{
        allProfiles,
        filteredProfiles,
        isFetching,
        handleFilterProfiles,
        refreshProfilesWithProfileViews,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  )
}

// Custom hook to use the ProfilesContext
export const useProfiles = () => {
  const context = useContext(ProfilesContext)
  if (context === undefined) {
    throw new Error('useProfiles must be used within a ProfilesProvider')
  }
  return context
}
