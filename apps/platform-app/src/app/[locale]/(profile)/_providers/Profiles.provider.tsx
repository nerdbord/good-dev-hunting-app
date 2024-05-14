'use client'
import { type ContactRequestModel } from '@/app/[locale]/(profile)/_models/contact-request.model'
import { type ProfileViewModel } from '@/app/[locale]/(profile)/_models/profile-view.model'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import {
  createFiltersObjFromSearchParams,
  filterByAvailability,
  filterByFullName,
  filterByLocation,
  filterBySalary,
  filterBySeniority,
  filterBySpecialization,
  filterByTechnology,
} from '@/app/[locale]/(profile)/profile.helpers'
import { type SearchParamsFilters } from '@/app/[locale]/(profile)/profile.types'
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
  markProfileAsVisited(profileView: ProfileViewModel): void
  markProfileAsContacted(contactRequest: ContactRequestModel): void
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

  const markProfileAsVisited = (profileView: ProfileViewModel) => {
    setAllProfiles((prevProfiles) => {
      return prevProfiles.map((profile) => {
        if (profile.id !== profileView.viewedProfileId) return profile

        const existingProfileView = profile.profileViews.find(
          (view) => view.viewerId === profileView.viewerId,
        )

        let profileViews: ProfileViewModel[]

        if (existingProfileView) {
          profileViews = profile.profileViews.map((view) => {
            if (view.viewerId !== profileView.viewerId) return view

            return { ...view, createdAt: new Date() }
          })
        } else {
          profileViews = [...profile.profileViews, profileView]
        }

        return {
          ...profile,
          profileViews: profileViews,
        }
      })
    })
  }

  const markProfileAsContacted = (contactRequest: ContactRequestModel) => {
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
        markProfileAsVisited,
        markProfileAsContacted,
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
