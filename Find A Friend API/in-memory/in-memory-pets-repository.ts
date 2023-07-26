import { PetsFilterProps, PetsRepository } from '@/repositories/pets-repository'
import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      age: data.age,
      size: data.size,
      org_id: data.org_id,
      about: data.about ?? null,
      city: data.city,
      sex: data.sex,
    }

    this.items.push(pet)
    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCity(city: string) {
    return this.items.filter((pet) => pet.city === city)
  }

  async findManyByCaracteristics({ age, city, sex, size }: PetsFilterProps) {
    const caracteristics: PetsFilterProps = {}

    if (age !== undefined) {
      caracteristics.age = age
    }
    if (city !== undefined) {
      caracteristics.city = city
    }
    if (sex !== undefined) {
      caracteristics.sex = sex
    }
    if (size !== undefined) {
      caracteristics.size = size
    }

    let petsFiltereds: Pet[] = []

    if (caracteristics.age !== undefined) {
      petsFiltereds = this.items.filter((pet) => pet.age === caracteristics.age)
    }
    if (caracteristics.sex !== undefined) {
      petsFiltereds = this.items.filter((pet) => pet.sex === caracteristics.sex)
    }
    if (caracteristics.size !== undefined) {
      petsFiltereds = this.items.filter(
        (pet) => pet.size === caracteristics.size,
      )
    }
    if (caracteristics.city !== undefined) {
      petsFiltereds = this.items.filter(
        (pet) => pet.city === caracteristics.city,
      )
    }

    return petsFiltereds
  }
}
