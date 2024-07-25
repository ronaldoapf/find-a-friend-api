import { Prisma, Pet } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findAll(params: FindAllParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energy_level: params.energy_level,
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
    })

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = prisma.pet.findUnique({
      where: { id },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
