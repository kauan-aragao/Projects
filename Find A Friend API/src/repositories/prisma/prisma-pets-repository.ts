import { Pet, Prisma } from '@prisma/client'
import { prisma } from '@/database'
import { PetsFilterProps, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
    })

    return pet
  }

  async findManyByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: { city },
    })

    return pets
  }

  async findManyByCaracteristics({ age, city, sex, size }: PetsFilterProps) {
    const caracteristics: PetsFilterProps = {}
    let pets: Pet[] = []

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

    if (
      age === undefined &&
      city === undefined &&
      sex === undefined &&
      size === undefined
    ) {
      pets = await prisma.pet.findMany()
    } else {
      pets = await prisma.pet.findMany({
        where: {
          age: caracteristics.age,
          sex: caracteristics.sex,
          size: caracteristics.size,
          city: caracteristics.city,
        },
      })
    }
    return pets
  }
}
