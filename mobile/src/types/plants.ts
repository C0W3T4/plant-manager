interface PlantFrequency {
  times: number
  repeatEvery: string
}

export interface PlantEnvironmentProps {
  key: string
  title: string
}

export interface PlantProps {
  id: string
  name: string
  about: string
  waterTips: string
  photo: string
  environments: [string]
  frequency: PlantFrequency
  hour: string
  dateTimeNotification: Date
}

export interface StoragePlantProps {
  [id: string]: {
    data: PlantProps
    notificationId: string
  }
}
