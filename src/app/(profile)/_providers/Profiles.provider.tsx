'use client'
import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import {
  createFiltersObjFromSearchParams,
  filterByAvailability,
  filterByFullName,
  filterByLocation,
  filterBySalary,
  filterBySeniority,
  filterBySpecialization,
  filterByTechnology,
} from '@/app/(profile)/profile.helpers'
import { type SearchParamsFilters } from '@/app/(profile)/profile.types'
import { type ContactRequest, type ProfileView } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

// Define the context
interface ProfilesContextProps {
  allProfiles: ProfileModel[]
  filteredProfiles: ProfileModel[]

  handleFilterProfiles(
    profiles: ProfileModel[],
    options?: {
      disableSpecFilter?: boolean
    },
  ): ProfileModel[]
  handleVisitProfile(profileView: ProfileView): void
  handleSetProfileContactRequest(contactRequest: ContactRequest): void
}

export const ProfilesContext = createContext<ProfilesContextProps | undefined>(
  undefined,
)

// Define the provider
export const ProfilesProvider = ({
  children,
  initialProfiles,
}: PropsWithChildren<{
  initialProfiles: ProfileModel[]
}>) => {
  const searchParams = useSearchParams()
  const [allProfiles, setAllProfiles] =
    useState<ProfileModel[]>(initialProfiles)

  const filters: SearchParamsFilters = useMemo(
    () => createFiltersObjFromSearchParams(searchParams),
    [searchParams],
  )

  const handleFilterProfiles = useCallback(
    (profiles: ProfileModel[], options?: { disableSpecFilter?: boolean }) => {
      const filteredProfiles = profiles
        .filter(filterBySalary(filters.salary))
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

  const handleVisitProfile = (profileView: ProfileView) => {
    setAllProfiles((prevProfiles) => {
      return prevProfiles.map((profile) => {
        if (profile.id !== profileView.viewedProfileId) return profile

        const existingProfileView = profile.profileViews.find(
          (view) => view.viewerId === profileView.viewerId,
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

  const handleSetProfileContactRequest = (contactRequest: ContactRequest) => {
    setAllProfiles((prevProfiles) => {
      return prevProfiles.map((profile) => {
        if (profile.id !== contactRequest.profileId) return profile

        return {
          ...profile,
          contactRequests: [...profile.contactRequests, contactRequest],
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
        handleFilterProfiles,
        handleVisitProfile,
        handleSetProfileContactRequest,
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
