export interface Application {
  readonly name: string
  readonly icon: string
  readonly path: string
}

export interface ApplicationCategory {
  readonly name: string
  readonly icon: string
  readonly applications: Application[]
  readonly codeName: string
}

export interface UserProfile {
  readonly userName: string
  readonly firstName: string
  readonly lastName: string
  readonly profileLink: string
}

export interface StickyBannerData {
  readonly type: 'info' | 'warning' | 'error'
  readonly message: string
}

export interface AppTemplateProps {
  readonly categories: ApplicationCategory[]
  readonly userProfile: UserProfile
  readonly showWarning: boolean
  readonly showError: boolean
  readonly expiringLicenseMessage: string
  readonly applicationVersion: string
  readonly stickyBanner?: StickyBannerData
}
