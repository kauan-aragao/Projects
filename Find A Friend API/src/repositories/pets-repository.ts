import { Pet, Prisma } from '@prisma/client'

export interface PetsFilterProps {
  city?: string
  sex?: 'Male' | 'Female'
  age?: 'Puppy' | 'Young' | 'Adult'
  size?: 'Small' | 'Medium' | 'Big'
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByCity(city: string): Promise<Pet[]>
  findManyByCaracteristics({
    age,
    sex,
    size,
    city,
  }: PetsFilterProps): Promise<Pet[]>
}
